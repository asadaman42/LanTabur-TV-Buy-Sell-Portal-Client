import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../FireBase/FireBase.config';
import { RotatingLines } from 'react-loader-spinner';

export const UniversalContext = createContext();
const auth = getAuth(app);

const ContexSupplier = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, presentUser => {
            setUser(presentUser);
            setLoading(false);
        });
        return () =>{unsubscribe();};
    }, []);

    if (loading) {
        return (
            <div className=' min-h-screen flex justify-center items-center'>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        )
    }

    const googleLogInProvider = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const emailLoginProvider = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const createUserByEmailAndPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updatePhotoAndName = photoAndName => {
        return updateProfile(auth.currentUser, photoAndName);
    };



    const contextInformation = {
        createUserByEmailAndPassword,
        emailLoginProvider,
        user,
        updatePhotoAndName,
        loading,


        googleLogInProvider,
        logOut,

        setLoading,

        setUser
    };

    return (
        <div>
            <UniversalContext.Provider value={contextInformation}>
                {children}
            </UniversalContext.Provider>
        </div>
    );
};

export default ContexSupplier;