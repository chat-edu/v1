import {findSubmissionsByNotebook} from "@/cosmosPostgres/services/submissions";

import {NotebookIdParams} from "@/app/api/submissions/freeResponse/notebook/[notebookId]/NotebookIdParams";
import {QuestionTypes} from "@/types/assignment/Question";

export const GET = async (req: Request, { params }: {params: NotebookIdParams}) => {
    return Response.json(await findSubmissionsByNotebook(params.notebookId, QuestionTypes.MultipleChoice))
}