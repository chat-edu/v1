import useItemData from "@/hooks/queries/utilities/useItemData";
import {transformAssignment, transformAssignmentWithQuestions} from "@/hooks/queries/assignment/transform";
import {Assignment} from "@/types/assignment/Assignment";
import {useCallback, useEffect} from "react";
import {
    subscribeToAssignmentChangedEvent,
    unsubscribeFromAssignmentChangedEvent
} from "@/cosmosPostgres/eventEmitters/assignmentEventEmitter";

const useAssignment = (assignmentId: Assignment["id"]) => {

    const [assignmentWithQuestions, loading, error, fetchData] = useItemData(
        `/api/assignment/${assignmentId}`,
        transformAssignmentWithQuestions
    );

    const handleAssignmentChanged = useCallback((changedAssignmentId: Assignment["id"]) => {
        if(assignmentId === changedAssignmentId) {
            fetchData();
        }
    }, [assignmentId, fetchData])

    useEffect(() => {
        subscribeToAssignmentChangedEvent(handleAssignmentChanged);
        return () => {
            unsubscribeFromAssignmentChangedEvent(handleAssignmentChanged);
        }
    }, [handleAssignmentChanged])

    return {
        assignmentWithQuestions,
        loading,
        error
    }
}

export default useAssignment;