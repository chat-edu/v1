import {updateSubmission} from "@/cosmosPostgres/services/submissions";

import {SubmissionRowInput} from "@/cosmosPostgres/types/submission";

import {SubmissionIdParams} from "@/app/api/submissions/freeResponse/[submissionId]/SubmissionIdParams";
import {QuestionTypes} from "@/types/assignment/Question";

export const PATCH = async (req: Request, {params}: {params: SubmissionIdParams}) => {
    const body = await req.json();

    const updatedFields: Partial<SubmissionRowInput> = {};
    if(body.answer) updatedFields.answer = body.answer;

    return Response.json(await updateSubmission(params.submissionId, updatedFields, QuestionTypes.FreeResponse));
}