import React, { useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../FireBase/FireBase.config';
import { useEffect } from 'react';

export const UniversalContext = createContext();
const auth = getAuth(app);

const ContexSupplier = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); 

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
        updateProfile(auth.currentUser, photoAndName);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (presentStudent) => {            
            setUser(presentStudent);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };

    }, []);

    const contextInformation = {
        createUserByEmailAndPassword,
        user,        
        googleLogInProvider,
        logOut,
        
        emailLoginProvider,
        loading,
        setLoading,
        updatePhotoAndName,        
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