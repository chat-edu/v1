import {deleteSubmission} from "@/cosmosPostgres/services/submissions";

import {SubmissionIdParams} from "@/app/api/submissions/freeResponse/[submissionId]/SubmissionIdParams";
import {QuestionTypes} from "@/types/assignment/Question";

export const DELETE = async (req: Request, { params }: { params: SubmissionIdParams }) => {
    return Response.json(await deleteSubmission(params.submissionId, QuestionTypes.MultipleChoice));
}