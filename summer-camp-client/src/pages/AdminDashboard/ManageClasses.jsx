import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: allClasses = [] } = useQuery(["class"], async () => {
    const res = await axiosSecure.get("/class");
    return res.data;
  });
//   console.log(allClasses);



  const handleMakeApprove =(classes) =>{
    // console.log(classes)
    fetch(`http://localhost:5000/class/approve/${classes._id}`, {
      method: 'PATCH'
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
      if(data.modifiedCount > 0){
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${classes.name} is an Approve By Admin!`,
              showConfirmButton: false,
              timer: 1500
            })
      }
  })
}




const handleMakeDeny =(classes) =>{
    // console.log(classes)
    fetch(`http://localhost:5000/class/deny/${classes._id}`, {
      method: 'PATCH'
  })
  .then(res => res.json())
  .then(data => {
    // console.log(data)
      if(data.modifiedCount > 0){
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${classes.name} is an  Deny By Admin!`,
              showConfirmButton: false,
              timer: 1500
            })
      }
  })
}



  return (
    <div className="overflow-x-auto">
    <Helmet>
    <title>Sports Academic | All Users</title>
    </Helmet>
       <h3 className="text-3xl font-semibold text-center mb-4">Total Classes:{allClasses.length}</h3>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Class Name</th>
            <th>Instructor Name</th>
            <th>Instructor Email</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Status</th>
            <th>Status</th>
            <th>Status</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {allClasses.map((classes, index) => (
            <tr key={classes._id}>
              <th>{index + 1}</th>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={classes.image} alt="img" />
                  </div>
                </div>
              </td>
              <td>{classes.name}</td>
              <td>{classes.instructorName}</td>
              <td>{classes.instructorEmail}</td>
              <td>{classes.price}</td>
              <td>{classes.seats}</td>
              <td>{
                classes.status === 'pending' ? 'pending' :  classes.status === 'approve'  ? "approve" :  classes.status === 'deny' ? " deny" : ''  
        }
        
        
        </td>
        <td> 
           
        {
            classes.status==="approve"  ||  classes.status==="deny" ? <button onClick={()=>handleMakeApprove( classes)} className={`btn btn-ghost bg-purple-600 hover:bg-purple-600 text-white  opacity-50 cursor-not-allowed `}>  Approve </button> :
            <button onClick={()=>handleMakeApprove(classes)} className={`btn  btn-ghost bg-purple-500 hover:bg-purple-600 text-white  `}> Approve </button>
        }
     
    
    </td>
    
    <td> 
           
     
    {
        classes.status === "deny" || classes.status === "approve" ? <button onClick={()=>handleMakeDeny(classes)} className={`btn btn-ghost bg-purple-500 hover:bg-purple-600 text-white   opacity-50 cursor-not-allowed`}> Deny  </button> :
        <button onClick={()=>handleMakeDeny(classes)} className={`btn btn-ghost bg-purple-500 hover:bg-purple-600 text-white  `}>Deny </button>
    }
    
       
          </td>
          <td>
          
          {
            classes.status === 'deny'  ? <button onClick={()=>handleMakeAdmin(user)} className={`btn btn-ghost bg-purple-600 hover:bg-purple-600 text-white   `}> Feedback </button> :
            <button onClick={()=>handleMakeAdmin(user)} className={`btn btn-ghost bg-purple-600 hover:bg-purple-600 text-white  opacity-50 cursor-not-allowed`}> Feedback </button>
          }
       
      
          </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClasses;
