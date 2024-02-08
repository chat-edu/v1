import React from 'react'

import Profile from "@/components/Layout/Navbar/Profile";
import AuthProviderButtons from "@/components/Utilities/AuthButtons/AuthProviderButtons";

import useAuth from "@/hooks/useAuth";

const AuthButton = () => {

    const { user } = useAuth();

    if(!user) {
        return (
            <AuthProviderButtons />
        )
    }

    return (
        <Profile
            user={user}
        />
    )
}

export default AuthButton