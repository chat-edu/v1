import {useMemo} from "react";

import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformSubmissionWithQuestion} from "@/hooks/queries/submissions/transformer";

import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";
import {QuestionTypes} from "@/types/assignment/Question";
import {SubmissionRowWithQuestion} from "@/cosmosPostgres/types";
import {SubmissionWithQuestion, UserSubmission} from "@/types/Submission";

const useUserSubmissions = (userId: User["id"], notebookId: Notebook["id"]) => {
    const [frqSubmissions, frqLoading] = useContainerData(
        `/api/submissions/freeResponse/notebook/${notebookId}/user/${userId}`,
        (submission: SubmissionRowWithQuestion) => transformSubmissionWithQuestion(submission, QuestionTypes.FreeResponse),
    );
    const [mcSubmissions, mcLoading] = useContainerData(
        `/api/submissions/multipleChoice/notebook/${notebookId}/user/${userId}`,
        (submission: SubmissionRowWithQuestion) => transformSubmissionWithQuestion(submission, QuestionTypes.MultipleChoice),
    );

    const userSubmissions: UserSubmission[] = useMemo(() => {
        if(!frqSubmissions || !mcSubmissions) return [];
        const submissions: UserSubmission[] = [];
        const frqMap = new Map<number, SubmissionWithQuestion[]>();
        const mcMap = new Map<number, SubmissionWithQuestion[]>();
        frqSubmissions.forEach(submission => {
            if(!frqMap.has(submission.assignmentId)) frqMap.set(submission.assignmentId, []);
            frqMap.get(submission.assignmentId)?.push(submission);
        });
        mcSubmissions.forEach(submission => {
            if(!mcMap.has(submission.assignmentId)) mcMap.set(submission.assignmentId, []);
            mcMap.get(submission.assignmentId)?.push(submission);
        });
        for(const [assignmentId, frqSubmissions] of frqMap) {
            const mcSubmissions = mcMap.get(assignmentId) || [];
            submissions.push({
                userId,
                assignmentId,
                submissions: [
                    ...frqSubmissions,
                    ...mcSubmissions,
                ].sort((a, b) => a.questionNumber - b.questionNumber),
            });
        }
        return submissions;
    }, [frqSubmissions, mcSubmissions]);

    return {
        userSubmissions,
        loading: frqLoading || mcLoading,
    }
}

export default useUserSubmissions;