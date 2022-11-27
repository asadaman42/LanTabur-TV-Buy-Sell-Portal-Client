import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            Dashboard
            <Link to='/dashboard/addproduct'> Add a Proudct </Link>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;