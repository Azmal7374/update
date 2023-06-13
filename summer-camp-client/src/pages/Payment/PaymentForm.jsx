import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import './PaymentForm.css'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const PaymentForm = ({ price, selectedClasses }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('')
  // console.log(price)
  console.log(selectedClasses._id)

  useEffect(() => {
     if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price,useAxiosSecure])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    // console.log('card', card)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("Payment method", paymentMethod);
    }
    setProcessing(true)

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }

    console.log("Payment Intent:",paymentIntent);
    setProcessing(false);
    if(paymentIntent.status ==='succeeded'){
      setTransactionId(paymentIntent.id);
      const payment = {
        email:user?.email, 
        transactionId: paymentIntent.id,
        price,
        instructorName:selectedClasses.instructorName,
        name:selectedClasses.name,
        studentEmail:selectedClasses.studentEmail,
        studentName:selectedClasses.studentName,
        quantity: selectedClasses.seats,
        image:selectedClasses.image,
        paymentStatus:'paid',
        enroll:'successfully',
      }
      axiosSecure.post(`/payments/${selectedClasses._id}`, payment)
      .then(res => {
        console.log(res.data)

        if(res.data.insertResult.insertedId){
          axiosSecure.put(`/payment/${selectedClasses.name}`)
          .then(res => {
            console.log(res.data)
          })
         toast.success('Successfully Enrolled!')
        }
      })

      
    }
  };
  
  return (
    <>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="   btn bg-purple-500 text-white hover:bg-purple-600 btn-sm mt-4   "
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          PAY
        </button>
      </form>
      {cardError && <p className="text-red-400 text-center">{cardError}</p>}
      {transactionId && <p className="text-purple-500  ">Transaction Complete With: {transactionId}</p>}
    </>
  );
};

export default PaymentForm;
