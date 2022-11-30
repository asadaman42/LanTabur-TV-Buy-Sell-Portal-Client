import React from 'react';
import Footer from '../../Shared/Footer';
import Navbar from '../../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import DashboardSIdebar from './DashboardSIdebar';

const Dashboard = () => {
    return (
        <div className='flex flex-col'>
            <Navbar></Navbar>
            <div className='flex'>
                <div className='border border-yellow-500'>
                    <DashboardSIdebar></DashboardSIdebar>
                </div>
                <div className='flex w-full justify-center items-center'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;