import {Assignment} from "@/types/assignment/Assignment";
import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformSubmission} from "@/hooks/queries/submissions/transformer";
import {useCallback, useEffect, useMemo} from "react";
import {Submission, UserSubmission} from "@/types/Submission";
import {QuestionTypes} from "@/types/assignment/Question";
import {SubmissionRow} from "@/cosmosPostgres/types/submission";
import {User} from "@/types/User";
import {
    subscribeToAssignmentChangedEvent,
    unsubscribeFromAssignmentChangedEvent
} from "@/cosmosPostgres/eventEmitters/assignmentEventEmitter";

const useUserSubmission = (assignmentId: Assignment['id'], userId: User["id"]) => {
    const [freeResponseSubmissions, freeResponseLoading, _a, fetchFreeResponseSubmissions] =
        useContainerData(
            `/api/submissions/freeResponse/assignment/${assignmentId}/user/${userId}`,
            (submission: SubmissionRow) => transformSubmission(submission, QuestionTypes.FreeResponse)
        );
    const [multipleChoiceSubmissions, multipleChoiceLoading, _b , fetchMultipleChoiceSubmissions] =
        useContainerData(
            `/api/submissions/multipleChoice/assignment/${assignmentId}/user/${userId}`,
            (submission: SubmissionRow) => transformSubmission(submission, QuestionTypes.MultipleChoice));

    const handleAssignmentChangedEvent = useCallback((changedAssignmentId: Assignment["id"]) => {
        if(changedAssignmentId === assignmentId) {
            fetchFreeResponseSubmissions();
            fetchMultipleChoiceSubmissions();
        }
    }, [assignmentId, fetchFreeResponseSubmissions, fetchMultipleChoiceSubmissions])

    useEffect(() => {
        subscribeToAssignmentChangedEvent(handleAssignmentChangedEvent);
        return () => {
            unsubscribeFromAssignmentChangedEvent(handleAssignmentChangedEvent);
        }
    }, [handleAssignmentChangedEvent]);

    const userSubmission: UserSubmission | null = useMemo(() => {
        if(freeResponseSubmissions.length === 0 || multipleChoiceSubmissions.length === 0) {
            return null;
        }

        return {
            userId,
            assignmentId,
            submissions: [freeResponseSubmissions, multipleChoiceSubmissions].flat().filter(Boolean) as Submission[],
        };
    }, [assignmentId, freeResponseSubmissions, multipleChoiceSubmissions, userId]);

    return {
        userSubmission,
        loading: freeResponseLoading || multipleChoiceLoading,
    }
}

export default useUserSubmission;