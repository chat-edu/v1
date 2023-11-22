import {useSession, signIn} from "next-auth/react";

import {AuthProviders} from "@/types/AuthProviderButton";

const useLogin = () => {

    const { data: session, status } = useSession();

    const onSignIn = async (provider: AuthProviders) => {
        await signIn(provider)
    }

    return {
        user: session?.user,
        onSignIn,
        loading: status === "loading",
    }
}

export default useLogin;