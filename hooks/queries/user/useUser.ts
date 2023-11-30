import {useCallback, useEffect} from "react";

import useItemData from "@/hooks/queries/utilities/useItemData";

import {subscribeToUsersChangedEvent, unsubscribeFromUsersChangedEvent} from "@/azure/cosmos/eventEmitters/userEventEmitter";

import { transformUser } from "@/hooks/queries/user/transformers";


const useUser = (userId: string) => {

    const [userData, loading, error, fetchUserData] = useItemData(`/api/users/${userId || "noUser"}`, transformUser);

    const handleUserChanged = useCallback(async (changedUserId: string) => {
        if(changedUserId === userId) {
            await fetchUserData();
        }
    }, [fetchUserData, userId])

    useEffect(() => {
        subscribeToUsersChangedEvent(handleUserChanged);
        return () => {
            unsubscribeFromUsersChangedEvent(handleUserChanged)
        };
    }, [handleUserChanged]);

    return {
        userData,
        loading,
        error,
        fetchUserData
    }
}

export default useUser;