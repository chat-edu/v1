import { useState, useEffect } from "react";

import { User } from "@firebase/auth"

import {useAuthState, useSignOut} from "react-firebase-hooks/auth";

import auth from "@/firebase/auth";

import {singletonHook} from "react-singleton-hook";

interface BasicUser {
    uid: string,
    displayName: string,
    photoURL: string,
}

interface AuthHook {
    user: BasicUser | null,
    isConnected: boolean,
    onSignOut: () => Promise<boolean>,
    useDefaultUser: () => void,
    loading: boolean,
    error: any,
}

const init: AuthHook = {
    user: null,
    isConnected: false,
    onSignOut: async () => false,
    useDefaultUser: () => {},
    loading: false,
    error: null,
}

const useAuthImpl = (): AuthHook => {

    const [rawUser, loading, error] = useAuthState(auth);

    const [user, setUser] = useState<BasicUser | null>(userToBasicUser(rawUser));

    useEffect(() => {
        console.log(rawUser);
        setUser(userToBasicUser(rawUser));
    }, [rawUser]);

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

    const useDefaultUser = () => {
        setUser({
            uid: "77VTfiYCWzV4ryPRAwWvvZJqTjK2",
            displayName: "Jason Hedman",
            photoURL: "https://lh3.googleusercontent.com/a/ACg8ocJwUFSzChifaHTcQ3nGsDZA_OAweXm3TGp-w1y3nVcNTw=s96-c",
        });
    }

    return {
        user,
        isConnected: !!user,
        useDefaultUser,
        onSignOut,
        loading,
        error,
    }
}

const userToBasicUser = (user: User | null | undefined): BasicUser | null => (
    user ? {
        uid: user.uid,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
    } : null
)

export default singletonHook(init, useAuthImpl);