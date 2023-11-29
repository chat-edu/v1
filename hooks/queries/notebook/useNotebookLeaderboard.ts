import {useCallback, useEffect} from "react";

import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformRankedNotebook} from "@/hooks/queries/notebook/transformers";

import {
    subscribeToNotebookLeaderboardChangedEvent,
    unsubscribeFromNotebookLeaderboardChangedEvent
} from "@/azure/cosmos/eventEmitters/notebookLeaderboardEventEmitter";

import {Notebook} from "@/types/Notebook";

const useNotebookLeaderboard = (notebookId: Notebook["id"]) => {
    const [userScores, loading, error, fetchUserScores] = useContainerData(
        `/api/notebooks/${notebookId}/scores`,
        transformRankedNotebook
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