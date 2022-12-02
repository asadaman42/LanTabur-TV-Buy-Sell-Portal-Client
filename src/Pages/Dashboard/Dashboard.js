import React from 'react';
import Navbar from '../../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import DashboardSIdebar from './DashboardSIdebar';
import Footer from '../../Shared/Footer';

const Dashboard = () => {
    return (
        <div className='flex flex-col'>
            <Navbar></Navbar>
            <div className='flex'>
                <div>
                    <DashboardSIdebar></DashboardSIdebar>
                </div>
                <div className='w-full mx-2'>
                    <div className='flex justify-center items-center'>
                    <Outlet></Outlet>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;