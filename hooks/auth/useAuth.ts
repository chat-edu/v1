import {signOut, useSession} from "next-auth/react";

const useAuth = () => {

    const { data: session, status } = useSession();

    const onSignOut = async () => {
        await signOut()
    }

    return {
        user: session?.user,
        isConnected: !!session?.user,
        onSignOut,
        loading: status === "loading",
    }
}

export default useAuth;