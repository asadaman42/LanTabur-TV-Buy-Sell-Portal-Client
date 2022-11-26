import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '../ContexSupplier/ContexSupplier';

import { Rings } from 'react-loader-spinner'


const Protected = ({ children }) => {
    const { user, loading } = useContext(UniversalContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <div className='text-center my-5'>
                    <Rings
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="8"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rings-loading"
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