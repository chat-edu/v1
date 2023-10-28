import React from 'react';

import {Button, IconButton} from "@chakra-ui/react";

import {FcGoogle} from "react-icons/fc";

import useSignIn from "@/hooks/auth/useSignIn";
const SignInWithGoogleButton = () => {

    const { onSignIn } = useSignIn();

    return (
        <>
            <Button
                leftIcon={<FcGoogle />}
                onClick={onSignIn}
                display={{base: 'none', md: 'flex'}}
            >
                Log In with Google
            </Button>
            <IconButton
                aria-label={'Log In with Google'}
                icon={<FcGoogle />}
                onClick={onSignIn}
                display={{base: 'flex', md: 'none'}}
            />
        </>

    );
};

export default SignInWithGoogleButton;