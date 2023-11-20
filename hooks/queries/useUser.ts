import useAuth from "@/hooks/auth/useAuth";

import useItemData from "@/hooks/queries/useItemData";

import {User} from "@/types/User";

const useUser = () => {

    const { user } = useAuth();

    const [userData, loading, error, fetchUserData] = useItemData<User>(`/api/users/${user?.uid}`);

    return {
        user,
        userData,
        loading,
        error,
        fetchUserData
    }
}

export default useUser;