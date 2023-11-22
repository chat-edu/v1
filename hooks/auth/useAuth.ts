import {useSession} from "next-auth/react";

const useAuth = () => {

    const { data: session, status } = useSession();

    return {
        user: session?.user,
        isConnected: !!session?.user,
        loading: status === "loading",
    }
}

export default useAuth;