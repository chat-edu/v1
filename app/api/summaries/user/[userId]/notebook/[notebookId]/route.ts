import {getUserNotebookSummary} from "@/cosmosPostgres/services/summaries";

import {NotebookIdParams} from "@/app/api/summaries/user/[userId]/notebook/[notebookId]/NotebookIdParams";

export const GET = async (req: Request, { params }: {params: NotebookIdParams}) => {
    return Response.json(await getUserNotebookSummary(params.userId, params.notebookId))
}