import {useCallback, useEffect} from "react";

import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformTopic} from "@/hooks/queries/topics/transformers";

import {
    subscribeToTopicsChangedEvent,
    unsubscribeFromTopicsChangedEvent
} from "@/cosmosPostgres/eventEmitters/topicsEventEmitter";

import {Notebook} from "@/types/Notebook";

const useTopics = (notebookId: Notebook["id"]) => {

    const [topics, loading, error, fetchTopics] = useContainerData(`/api/topics/notebook/${notebookId}`, transformTopic);

    const handleTopicsChanged = useCallback(async (changedNotebookId: number) => {
        console.log(changedNotebookId, notebookId)
        if(changedNotebookId === notebookId) {
            console.log('fetching topics')
            await fetchTopics();
        }
    }, [fetchTopics, notebookId])

    useEffect(() => {
        subscribeToTopicsChangedEvent(handleTopicsChanged);
        return () => {
            unsubscribeFromTopicsChangedEvent(handleTopicsChanged)
        };
    }, [handleTopicsChanged]);


    return {
        topics: topics || [],
        loading,
        error,
        fetchTopics
    }
}

export default useTopics;