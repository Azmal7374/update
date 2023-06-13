import React from 'react';
import Sidebar from '../components/AdminDashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import useStudent from '../hooks/useStudent';
import InstructorDashboard from '../components/InstructorDashboard/InstructorDashboard';
import StudentDashboard from '../components/StudentDashboard/StudentDsahboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
    const[isAdmin] = useAdmin()
    const[isInstructor] =useInstructor()
    const [isStudent] = useStudent()
    console.log[isAdmin, isInstructor, isStudent]
  
    
    return (
        <div className='relative min-h-screen md:flex'>
       <ToastContainer></ToastContainer>
       
        {
        isAdmin ? <Sidebar></Sidebar> : isInstructor ? <InstructorDashboard></InstructorDashboard> :  <StudentDashboard></StudentDashboard>
       }  
        <div className='flex-1  md:ml-64'>
            <div className='p-5'>
              <Outlet />
            </div>
          </div>
        </div>
    );
};

export default Dashboard;