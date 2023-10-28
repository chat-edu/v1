import auth from "@/firebase/auth";

import {useAuthState, useSignInWithGoogle} from "react-firebase-hooks/auth";

import {useToast} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {User} from "@firebase/auth";

const useLogin = () => {

    const [rawUser, loading, error] = useAuthState(auth);

    const [user, setUser] = useState<User | null| undefined>(rawUser);

    useEffect(() => {
        setUser(rawUser);
    }, [rawUser]);

    const [signIn] = useSignInWithGoogle(auth)

    const toast = useToast();

    const onSignIn = async () => {
        await signIn([], {hd: "vanderbilt.edu"})
            .then((_result) => {
                toast({
                    title: "Success",
                    description: "Signed in successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    return {
        user,
        onSignIn,
        loading,
        error
    }
}

export default useLogin;