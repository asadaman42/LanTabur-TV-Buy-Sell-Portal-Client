import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '../ContexSupplier/ContexSupplier';

import { FidgetSpinner } from ''


const Protected = ({ children }) => {
    const { user, loading } = useContext(UniversalContext);
    const location = useLocation();

    if (loading) {
        return <div className='text-center my-5'>
            <FidgetSpinner
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass='my-5'
                ballColors={['#ff0000', '#00ff00', '#0000ff']}
                backgroundColor="#F4442E"
            />
        </div>
    }

    if (user) {
        return children;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
};

export default Protected;