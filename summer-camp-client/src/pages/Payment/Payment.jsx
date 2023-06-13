import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useLoaderData, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_pk);

const Payment = () => {
  // const data = useLoaderData()
  // console.log(data)
  // const total = cart.reduce((sum,item)=> sum + item.price, 0)
  //    const price = parseFloat(total.toFixed(2))

  const { id } = useParams();
  console.log(id);
  const [axiosSecure] = useAxiosSecure();
//   console.log(user.email);
  const { data: selectedClasses = [] } = useQuery(["selectClass"], async () => {
    const res = await axiosSecure.get(`/savedClass?id=${id}`);
    return res.data;
  });
  console.log(selectedClasses);
  const price = selectedClasses.price
  console.log( price)

  return (
    <div>
      <h2 className="text-3xl">Enroll With: {selectedClasses.name}</h2>

      <Elements stripe={stripePromise}>
        <PaymentForm price={price} selectedClasses={selectedClasses} id={id}></PaymentForm>
      </Elements>
    </div>
  );
};

export default Payment;
