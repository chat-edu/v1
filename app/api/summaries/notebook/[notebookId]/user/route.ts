import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";
import {findUserNotebookSummariesByNotebook} from "@/cosmosPostgres/services/summaries";

export const GET = async (req: Request, { params }: { params: NotebookIdParams }) => {
    return Response.json(await findUserNotebookSummariesByNotebook(params.notebookId));
}