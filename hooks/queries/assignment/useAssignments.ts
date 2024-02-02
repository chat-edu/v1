import {useCallback, useEffect} from "react";

import {transformAssignment} from "@/hooks/queries/assignment/transform";
import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {
    subscribeToAssignmentChangedEvent,
    unsubscribeFromAssignmentChangedEvent
} from "@/cosmosPostgres/eventEmitters/assignmentEventEmitter";

import {Topic} from "@/types/Topic";

const useAssignments = (topicId: Topic["id"]) => {
    const [assignments, loading, error, fetchData] = useContainerData(
        `/api/assignment/topic/${topicId}`,
        transformAssignment
    );

    const handleAssignmentChanged = useCallback((changedTopicId: Topic["id"]) => {
        if(topicId === changedTopicId) {
            fetchData();
        }
    }, [topicId, fetchData])

    useEffect(() => {
        subscribeToAssignmentChangedEvent(handleAssignmentChanged);
        return () => {
            unsubscribeFromAssignmentChangedEvent(handleAssignmentChanged);
        }
    }, [handleAssignmentChanged])

    return {
        assignments,
        loading,
        error
    }
}

export default useAssignments;