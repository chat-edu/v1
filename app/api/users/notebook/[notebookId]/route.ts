import {NotebookIdParams} from "@/app/api/users/notebook/[notebookId]/NotebookIdParams";
import {findEnrolledUsersByNotebookId} from "@/cosmosPostgres/services/user";

export const GET = async (req: Request, { params }: { params: NotebookIdParams}) => {
    return Response.json(await findEnrolledUsersByNotebookId(params.notebookId));
}