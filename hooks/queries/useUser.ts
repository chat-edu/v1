import {useCallback, useEffect} from "react";

import useAuth from "@/hooks/auth/useAuth";
import useItemData from "@/hooks/queries/useItemData";

import {subscribeToUsersChangedEvent, unsubscribeFromUsersChangedEvent} from "@/eventEmitters/userEventEmitter";

import {User} from "@/types/User";


const useUser = () => {

    const { user } = useAuth();

    const [userData, loading, error, fetchUserData] = useItemData<User>(`/api/users/${user?.uid}`);

    const handleUserChanged = useCallback(async (changedUserId: string) => {
        if(changedUserId === user?.uid) {
            await fetchUserData();
        }
    }, [fetchUserData, user?.uid])

    useEffect(() => {
        subscribeToUsersChangedEvent(handleUserChanged);
        return () => {
            unsubscribeFromUsersChangedEvent(handleUserChanged)
        };
    }, [handleUserChanged]);

    return {
        user,
        userData,
        loading,
        error,
        fetchUserData
    }
}

export default useUser;