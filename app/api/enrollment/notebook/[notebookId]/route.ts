import {NotebookIdParams} from "@/app/api/enrollment/notebook/[notebookId]/NotebookIdParams";
import {findEnrollmentsByNotebookId} from "@/cosmosPostgres/services/enrollments";

export const GET = async (req: Request, { params }: { params: NotebookIdParams}) => {
    return Response.json(await findEnrollmentsByNotebookId(params.notebookId));
}