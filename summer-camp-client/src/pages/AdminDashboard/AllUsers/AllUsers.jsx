import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const [adminDisabled, setAdminDisabled] = useState(true)
  const { data: users = [], refetch } = useQuery(['users'], async () => {
      const res = await axiosSecure.get('/users')
      console.log(res)
      return res.data;
  })

    const handleMakeAdmin = (user)=>{
        console.log(user)
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleMakeInstructor =(user) =>{
          console.log(user)
          fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
            if(data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Instructor now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleDelete = (user)=>{
        console.log(user)
    }

    return (
        <div className="w-full">
        <Helmet>
        <title>Sports Academic | All Users</title>
        </Helmet>
           <h3 className="text-3xl font-semibold text-center mb-4 text-purple-500">Total Users:{users.length}</h3>


           <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
        <th>Action</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {

        users.map((user, index) =>
            <tr key={user._id}>
        <th>{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{
            user.role === 'admin' ? 'admin' :  user.role === 'instructor'  ? "instructor" : "student"   
    }
    
    
    </td>
    <td> 
       
    {
        user.role === 'admin'  ? <button onClick={()=>handleMakeAdmin(user)} className={`btn btn-ghost bg-purple-600 hover:bg-purple-600 text-white  opacity-50 hover:cursor-not-allowed `}>  Make Admin </button> :
        <button onClick={()=>handleMakeAdmin(user)} className={`btn  btn-ghost bg-purple-500 hover:bg-purple-600 text-white  `}>  Make Admin </button>
    }
 

</td>

<td> 
       
 
{
    user.role === 'admin' ||  user.role === 'instructor' ? <button onClick={()=>handleMakeAdmin(user)} className={`btn btn-ghost bg-purple-500 hover:bg-purple-600 text-white   opacity-50 hover:cursor-not-allowed`}> Make  Instructor  </button> :
    <button onClick={()=>handleMakeInstructor(user)} className={`btn btn-ghost bg-purple-500 hover:bg-purple-600 text-white  `}> Make  Instructor </button>
}




</td>
        <td>
        <button onClick={()=>handleDelete(user)} className="btn btn-ghost bg-purple-500 hover:bg-purple-600 text-white  "><FaTrashAlt></FaTrashAlt></button>
      </td>
      </tr>
            )
      }
      
   
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;