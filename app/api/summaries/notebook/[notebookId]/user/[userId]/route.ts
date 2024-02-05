import {UserIdParams} from "@/app/api/summaries/notebook/[notebookId]/user/[userId]/UserIdParams";
import {getUserNotebookSummary} from "@/cosmosPostgres/services/summaries";

export const GET = async (req: Request, { params }: { params: UserIdParams }) => {
    return Response.json(await getUserNotebookSummary(params.userId, params.notebookId));
}