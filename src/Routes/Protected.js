import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '../ContexSupplier/ContexSupplier';

import { RotatingLines } from 'react-loader-spinner'


const Protected = ({ children }) => {
    const { user, loading } = useContext(UniversalContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className=' min-h-screen flex justify-center items-center'>
                <div>
                    <RotatingLines
                        strokeColor="lime"
                        strokeWidth="3"
                        animationDuration="0.25"
                        width="400"
                        visible={true}
                    />
                </div>
            </div>
        )
    }

    if (user) {
        return children;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
};

export default Protected;