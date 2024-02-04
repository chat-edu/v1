import {getSubmission} from "@/cosmosPostgres/services/submissions";

import {SubmissionIdParams} from "@/app/api/submissions/freeResponse/[submissionId]/SubmissionIdParams";
import {QuestionTypes} from "@/types/assignment/Question";

export const GET = async (req: Request, {params}: {params: SubmissionIdParams}) => {
    return Response.json(await getSubmission(params.submissionId, QuestionTypes.FreeResponse));
}