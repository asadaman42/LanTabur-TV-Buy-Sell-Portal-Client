import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHomepage = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Please explore Dashboard exclusive ption for you from right side. </p>
                        <p className="mb-5">Or, You can explore Home Page. </p>
                        <Link to='/'> <button className="btn btn-primary">Home</button> </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomepage;