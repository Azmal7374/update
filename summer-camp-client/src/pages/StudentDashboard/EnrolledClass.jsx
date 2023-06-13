import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const EnrolledClass = () => {
    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure();
//   console.log(user.email);
  const { data: enrollClasses = [] } = useQuery(["enrollClass"], async () => {
    const res = await axiosSecure.get(`/payment/${user?.email}`);
    return res.data;
  });
  console.log(enrollClasses)
    return (
     <div>
     <h2 className="text-xl text-center font-semibold text-purple-500">Total Enrolled Class: {enrollClasses.length}</h2>
     <div className="overflow-x-auto mt-5">
     <table className="table">
       {/* head */}
       <thead>
         <tr>
           <th>#</th>
           <th>Image</th>
           <th>Class Name</th>
           <th>Price</th>
           <th>Payment Status</th>
         </tr>
       </thead>
       <tbody>
         {enrollClasses.map((classes, index) => (
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
             <td>{classes.paymentStatus}</td>
             
      
           
           </tr>
         ))}
       </tbody>
     </table>
   </div>
     
     
     </div>
    );
};

export default EnrolledClass;