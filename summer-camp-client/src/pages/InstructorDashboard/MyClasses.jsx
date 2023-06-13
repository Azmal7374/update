import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const MyClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
    console.log(user.email)
  const { data: allClasses = [] } = useQuery(["class"], async () => {
    const res = await axiosSecure.get(`/class/${user?.email}`);
    return res.data;
  });

  console.log(allClasses);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Class Name</th>
            <th>Price</th>
            <th>Seats</th>
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
              <td>{classes.price}</td>
              <td>{classes.seats}</td>
              <td>{classes.status}</td>
              <td> 
       
              {
                classes.status === 'pending'  ? <button onClick={()=>handleMakeAdmin(user)} className={`btn btn-ghost bg-purple-600 hover:bg-purple-600 text-white   `}> Feedback </button> :
                 ""
              }
           
          
          </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyClasses;
