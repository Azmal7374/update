import React from 'react';
import Navbar from '../pages/share/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/share/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Main = () => {
    return (
        <div className='bg-base-100'>
        <ToastContainer></ToastContainer>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;