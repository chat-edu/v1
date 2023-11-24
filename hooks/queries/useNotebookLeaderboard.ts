import useContainerData from "@/hooks/queries/useContainerData";

import {Notebook} from "@/types/Notebook";
import {UserScore} from "@/types/Score";
import {useCallback, useEffect} from "react";
import {
    subscribeToNotebookLeaderboardChangedEvent,
    unsubscribeFromNotebookLeaderboardChangedEvent
} from "@/eventEmitters/notebookLeaderboardEventEmitter";

const useNotebookLeaderboard = (notebookId: Notebook["id"]) => {
    const [userScores, loading, error, fetchUserScores] = useContainerData<UserScore>(`/api/notebooks/${notebookId}/scores`);

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