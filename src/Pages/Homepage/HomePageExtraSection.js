import React from 'react';
import { Link } from 'react-router-dom';

const HomePageExtraSection = () => {
    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://cdn.mos.cms.futurecdn.net/BxVMhZsbWVArcHMWuGmBdX.jpg" alt='' className="sm:max-w-lg rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Why Us</h1>
                        <p className="py-6">Because here you can purchase used TV at a reasonable price and also sell your TV with no effort. Just Create an account as seller and advertise your TV.</p>
                        <Link to='/register'> <button className="btn btn-primary">Register to JUMP IN</button> </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageExtraSection;