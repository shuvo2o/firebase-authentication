import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';

const AuthContext = createContext();
const auth = getAuth(app);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); // If user is null (logged out), it updates correctly
            setLoading(false);    // Once Firebase responds, stop loading
        });

        return () => unsubscribe();
    }, []); // 'auth' is stable, so an empty array is fine here

    const value = { 
        currentUser,
        loading 
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} 
        </AuthContext.Provider>
    );
};