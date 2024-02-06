import {useMemo} from "react";

import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformSubmissionWithQuestion} from "@/hooks/queries/submissions/transformer";

import {QuestionTypes} from "@/types/assignment/Question";
import {SubmissionRowWithQuestion} from "@/cosmosPostgres/types";
import {SubmissionWithQuestion, UserSubmission} from "@/types/Submission";
import {Notebook} from "@/types/Notebook";

const useNotebookSubmissions = (notebookId: Notebook["id"]) => {
    const [frqSubmissions, frqLoading] = useContainerData(
        `/api/submissions/freeResponse/notebook/${notebookId}`,
        (submission: SubmissionRowWithQuestion) => transformSubmissionWithQuestion(submission, QuestionTypes.FreeResponse)
    )
    const [mcSubmissions, mcLoading] = useContainerData(
        `/api/submissions/multipleChoice/notebook/${notebookId}`,
        (submission: SubmissionRowWithQuestion) => transformSubmissionWithQuestion(submission, QuestionTypes.MultipleChoice)
    )

    const userSubmissionsMap = useMemo(() => {
        if(frqLoading || mcLoading) return null
        const userSubmissions: UserSubmission[] = []
        const frqSubmissionsMap = new Map<string, Map<number, SubmissionWithQuestion[]>>()
        const mcSubmissionsMap = new Map<string, Map<number, SubmissionWithQuestion[]>>()
        frqSubmissions.forEach(submission => {
            const {assignmentId, userId} = submission
            if(!frqSubmissionsMap.has(userId)) frqSubmissionsMap.set(userId, new Map())
            if(!frqSubmissionsMap.get(userId)!.has(assignmentId)) frqSubmissionsMap.get(userId)!.set(assignmentId, [])
            frqSubmissionsMap.get(userId)!.get(assignmentId)!.push(submission)
        })
        mcSubmissions.forEach(submission => {
            const {assignmentId, userId} = submission
            if(!mcSubmissionsMap.has(userId)) mcSubmissionsMap.set(userId, new Map())
            if(!mcSubmissionsMap.get(userId)!.has(assignmentId)) mcSubmissionsMap.get(userId)!.set(assignmentId, [])
            mcSubmissionsMap.get(userId)!.get(assignmentId)!.push(submission)
        })
        frqSubmissionsMap.forEach((assignmentMap, userId) => {
            assignmentMap.forEach((submissions, assignmentId) => {
                userSubmissions.push({
                    userId,
                    assignmentId,
                    submissions
                })
            })
        })
        mcSubmissionsMap.forEach((assignmentMap, userId) => {
            assignmentMap.forEach((submissions, assignmentId) => {
                const userSubmission = userSubmissions.find(sub => sub.userId === userId && sub.assignmentId === assignmentId)
                if(userSubmission) userSubmission.submissions.push(...submissions)
                else userSubmissions.push({
                    userId,
                    assignmentId,
                    submissions
                })
            })
        })
        // create a map from userId to an array of user submissions
        const userSubmissionsMap = new Map<string, UserSubmission[]>()
        userSubmissions.forEach(submission => {
            if(!userSubmissionsMap.has(submission.userId)) userSubmissionsMap.set(submission.userId, [])
            userSubmissionsMap.get(submission.userId)!.push(submission)
        })
        return userSubmissionsMap
    }, [frqSubmissions, mcSubmissions]);

    return {
        userSubmissionsMap,
        loading: frqLoading || mcLoading
    }
}

export default useNotebookSubmissions;