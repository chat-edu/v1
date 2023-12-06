import React from 'react'

import AuthProviderIconButtons from "@/components/Utilities/AuthButtons/AuthProviderIconButtons";
import Profile from "@/components/Layout/Navbar/Profile";

import useAuth from "@/hooks/useAuth";

const AuthButton = () => {

    const { user } = useAuth();

    if(!user) {
        return (
            <AuthProviderIconButtons />
        )
    }

    return (
        <Profile
            user={user}
        />
    )
}

export default AuthButton