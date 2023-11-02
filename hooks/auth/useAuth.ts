import { useState, useEffect } from "react";

import { User } from "@firebase/auth"

import {useAuthState, useSignOut} from "react-firebase-hooks/auth";

import auth from "@/firebase/auth";

const useAuth = () => {

    const [rawUser, loading, error] = useAuthState(auth);

    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        if (rawUser) {
            setUser(rawUser);
        } else {
            setUser(null);
        }
    }, [rawUser])

    // sign out function to allow for sign out from any component
    const [signOut] = useSignOut(auth);

    const onSignOut = async (): Promise<boolean> => (
        signOut()
            .then((_result) => {
                setUser(null)
                return true;
            })
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