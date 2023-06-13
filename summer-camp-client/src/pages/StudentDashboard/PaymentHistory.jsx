import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {

    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure();
//   console.log(user.email);
  const { data: enrollClasses = [] } = useQuery(["enrollClass"], async () => {
    const res = await axiosSecure.get(`/history/${user?.email}`);
    return res.data;
  });
  console.log(enrollClasses)
    return (
        <div>
        <h2 className="text-xl text-center font-semibold text-purple-500">Successfully Payment Class: {enrollClasses.length}</h2>
        <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead  className=" text-black">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Transaction Id</th>
              <th>Payment Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody  className=" text-black">
            {enrollClasses.map((classes, index) => (
              <tr key={classes._id}>
                <th>{index + 1}</th>
                <td>{classes.studentEmail}</td>
                <td>{classes.transactionId}</td>
                <td>{classes.paymentStatus}</td>
                <td>{classes.createAt}</td>
                
         
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        
        
        </div>
    );
};

export default PaymentHistory;