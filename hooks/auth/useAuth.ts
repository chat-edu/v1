import { useState, useEffect } from "react";

import {useAuthState, useSignOut} from "react-firebase-hooks/auth";

import auth from "@/firebase/auth";

import {User} from "@firebase/auth";

const useAuth = () => {

    const [rawUser, loading, error] = useAuthState(auth);

    const [user, setUser] = useState<User | null| undefined>(rawUser);

    useEffect(() => {
        setUser(rawUser);
    }, [rawUser]);

    // sign out function to allow for sign out from any component
    const [signOut] = useSignOut(auth);

    const onSignOut = async (): Promise<boolean> => (
        signOut()
            .then((_result) => true)
            .catch((_error) => false)
    )

    return {
        user,
        isConnected: !!user,
        onSignOut,
        loading,
        error,
    }
}

export default useAuth;