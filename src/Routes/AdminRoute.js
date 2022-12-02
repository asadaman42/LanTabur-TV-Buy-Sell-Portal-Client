import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UniversalContext } from '../ContexSupplier/ContexSupplier';
import { FidgetSpinner } from 'react-loader-spinner'
import useAdmin from '../Custom Hook/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(UniversalContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading) {
        return (
            <div className=' min-h-screen flex justify-center items-center'>
                <div>
                    <FidgetSpinner
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                        ballColors={['#ff0000', '#00ff00', '#0000ff']}
                        backgroundColor="#F4442E"
                    />
                </div>
            </div>
        )
    }

    if (user && isAdmin) {
        return children;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
};

export default AdminRoute;