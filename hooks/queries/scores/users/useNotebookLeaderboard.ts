import {useCallback, useEffect} from "react";

import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformUserNotebookScore} from "@/hooks/queries/scores/users/transformers";

import {
    subscribeToNotebookLeaderboardChangedEvent,
    unsubscribeFromNotebookLeaderboardChangedEvent
} from "@/cosmosPostgres/eventEmitters/notebookLeaderboardEventEmitter";

import {Notebook} from "@/types/Notebook";

const useNotebookLeaderboard = (notebookId: Notebook["id"]) => {
    const [userScores, loading, error, fetchUserScores] = useContainerData(
        `/api/scores/users/notebook/${notebookId}`,
        transformUserNotebookScore
    );

    const handleLeaderboardChanged = useCallback( (changedNotebookId: Notebook["id"]) => {
        if(changedNotebookId === notebookId) {
            fetchUserScores();
        }
    }, [fetchUserScores, notebookId]);

    useEffect(() => {
        subscribeToNotebookLeaderboardChangedEvent(handleLeaderboardChanged);
        return () => {
            unsubscribeFromNotebookLeaderboardChangedEvent(handleLeaderboardChanged);
        }
    }, [handleLeaderboardChanged]);

    return {
        userScores,
        loading,
        error,
    }
}

export default useNotebookLeaderboard;