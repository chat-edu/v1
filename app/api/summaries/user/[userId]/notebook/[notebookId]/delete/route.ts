import {deleteUserNotebookSummary} from "@/cosmosPostgres/services/summaries";

import {NotebookIdParams} from "@/app/api/summaries/user/[userId]/notebook/[notebookId]/NotebookIdParams";

export const DELETE = async (req: Request, { params }: {params: NotebookIdParams}) => {
    return Response.json(await deleteUserNotebookSummary(params.userId, params.notebookId))
}