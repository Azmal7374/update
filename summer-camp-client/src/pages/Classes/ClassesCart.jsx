import React, { useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ClassesCart = ({classes}) => {
  const {user} = useAuth()
  const [selected, setSelected] = useState(true)
  const [axiosSecure, refetch] = useAxiosSecure();
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const {name, image, instructorName, seats, price} = classes;
    // console.log(typeof seats)
    const className = seats < 1 ? 'bg-red-500': 'bg-slate-100';


    const selectClass = (classes) =>{
      console.log(classes.name)
      let availableSeats =seats - 1;
      console.log(availableSeats)
      // const newSeats =availableSeats - 2
      //    let count =0;
      // if(seats === seats){
      //   count = availableSeats;

      // }
         
      //  let newSeats = ;
      const paymentStatus = 'unpaid'
      const addedSelectedValue = {
        studentName:user?.displayName,
        studentEmail:user?.email ,
        name,
        image,
        instructorName,
        seats: availableSeats,
        price,
        paymentStatus
      };
        
      axiosSecure.post("/savedClass", addedSelectedValue)
      .then((data) => {
        console.log("After posting new Class", data.data);

        if(data.data.acknowledged === true){
           if (data.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Selected Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          fetch(`http://localhost:5000/class/${classes._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
            if(data.modifiedCount > 0){
                refetch();
                console.log(`${classes.seats} is decrease`)
            }
        })
        }

        else {
          toast.error (`${classes.name} Is Already Selected By ${user?.displayName}`)
        }
        
      });

     

  
    // setSelected(false)

    }



    return (
        <div>
        <div className={`card w-96 shadow-xl ${className}`}>
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl w-96 h-40" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p className="">Instructor Name: {instructorName}</p>
          <p>Available Seats: {seats}</p>
          <p>Available Price: {price}</p>
          <div className="card-actions">
          {
            seats < 1 || isAdmin || isInstructor?   <button className="btn  bg-purple-500 hover:bg-purple-600 text-white opacity-50 hover:cursor-not-allowed ">Select</button> :
            <button onClick={()=>selectClass(classes)} className="btn  bg-purple-500 hover:bg-purple-600 text-white">Select</button>
          }
          </div>
        </div>
      </div>
        </div>
    );
};

export default ClassesCart;