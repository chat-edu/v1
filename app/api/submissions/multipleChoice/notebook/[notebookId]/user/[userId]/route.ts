import {findUserSubmissionsByNotebook} from "@/cosmosPostgres/services/submissions";

import {UserIdParams} from "@/app/api/submissions/freeResponse/notebook/[notebookId]/user/[userId]/UserIdParams";
import {QuestionTypes} from "@/types/assignment/Question";

export const GET = async (req: Request, { params }: { params: UserIdParams }) => {
    return Response.json(await findUserSubmissionsByNotebook(params.userId, params.notebookId, QuestionTypes.MultipleChoice))
}