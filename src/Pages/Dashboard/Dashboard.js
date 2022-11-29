import React from 'react';
import Footer from '../../Shared/Footer';
import Navbar from '../../Shared/Navbar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>                       
        </div>
    );
};

export default Dashboard;