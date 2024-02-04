import {Assignment} from "@/types/assignment/Assignment";
import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformSubmission} from "@/hooks/queries/submissions/transformer";
import {useMemo} from "react";
import {Submission, UserSubmission} from "@/types/Submission";
import {QuestionTypes} from "@/types/assignment/Question";
import {SubmissionRow} from "@/cosmosPostgres/types/submission";

const processSubmissions = (submissions: Submission[]) => {
    const submissionMap = new Map<string, Submission[]>();
    submissions.forEach(submission => {
        if(!submissionMap.has(submission.userId)) {
            submissionMap.set(submission.userId, [] as Submission[]);
        }
        submissionMap.get(submission.userId)?.push(submission);
    });
    return submissionMap;
}

const useSubmissions = (assignmentId: Assignment['id']) => {
    const [freeResponseSubmissions, freeResponseLoading] =
        useContainerData(
            `/api/submissions/freeResponse/assignment/${assignmentId}`,
            (submission: SubmissionRow) => transformSubmission(submission, QuestionTypes.FreeResponse)
        );
    const [multipleChoiceSubmissions, multipleChoiceLoading] =
        useContainerData(
            `/api/submissions/multipleChoice/assignment/${assignmentId}`,
            (submission: SubmissionRow) => transformSubmission(submission, QuestionTypes.MultipleChoice));

    const userSubmissions: UserSubmission[] = useMemo(() => {
        if(freeResponseSubmissions.length === 0 || multipleChoiceSubmissions.length === 0) {
            return [];
        }

        const freeResponseMap = processSubmissions(freeResponseSubmissions);
        const multipleChoiceMap = processSubmissions(multipleChoiceSubmissions);

        const userSubmissions: UserSubmission[] = [];
        freeResponseMap.forEach((submissions, key) => {
            userSubmissions.push({
                userId: key,
                assignmentId,
                submissions: [submissions, multipleChoiceMap.get(key)].flat().filter(Boolean) as Submission[],
            });
        });
        return userSubmissions;
    }, [assignmentId, freeResponseSubmissions, multipleChoiceSubmissions]);

    return {
        userSubmissions,
        loading: freeResponseLoading || multipleChoiceLoading,
    }
}

export default useSubmissions;