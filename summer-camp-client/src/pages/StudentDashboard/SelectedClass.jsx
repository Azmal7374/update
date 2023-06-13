import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';



const SelectedClass = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
      console.log(user.email)
    const { data: selectedClasses = [] } = useQuery(["class"], async () => {
      const res = await axiosSecure.get(`/savedClass/${user?.email}`);
      return res.data;
    });
  console.log(selectedClasses)
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
              <th>Payment Status</th>
              <th>Pay</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {selectedClasses.map((classes, index) => (
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
                <td>{classes.paymentStatus}</td>
                <td> 
         
               
               <Link to={`/dashboard/payment/${classes._id}`}>
               <button  className={`btn btn-ghost bg-purple-600 hover:bg-purple-600 text-white   `}> Pay </button></Link>
             
            
            </td>
            <td>
            <button className={`btn btn-ghost bg-purple-600 hover:bg-purple-600 text-white   `}> Delete </button>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default SelectedClass;