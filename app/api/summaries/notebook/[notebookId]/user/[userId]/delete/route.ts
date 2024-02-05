import {deleteUserNotebookSummary} from "@/cosmosPostgres/services/summaries";

import {UserIdParams} from "@/app/api/summaries/notebook/[notebookId]/user/[userId]/UserIdParams";

export const DELETE = async (req: Request, { params }: {params: UserIdParams}) => {
    return Response.json(await deleteUserNotebookSummary(params.userId, params.notebookId))
}