import {deleteNotebookSummary} from "@/cosmosPostgres/services/summaries/notebookSummaries";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

export const DELETE = async (req: Request, { params }: {params: NotebookIdParams}) => {
    return Response.json(await deleteNotebookSummary(params.notebookId))
}