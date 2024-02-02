import {useCallback, useEffect} from "react";

import {transformAssignment} from "@/hooks/queries/assignment/transform";
import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {
    subscribeToAssignmentsChangedEvent,
    unsubscribeFromAssignmentsChangedEvent
} from "@/cosmosPostgres/eventEmitters/assignmentsEventEmitter";

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
        subscribeToAssignmentsChangedEvent(handleAssignmentChanged);
        return () => {
            unsubscribeFromAssignmentsChangedEvent(handleAssignmentChanged);
        }
    }, [handleAssignmentChanged])

    return {
        assignments,
        loading,
        error
    }
}

export default useAssignments;