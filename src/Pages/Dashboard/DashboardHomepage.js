import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHomepage = () => {
    return (
        <div>
            This is dashboard Homepage.
            <Link to='/dashboard/addproduct'> Add a Proudct </Link>
        </div>
    );
};

export default DashboardHomepage;