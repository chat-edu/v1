import {getNotebookByAccessCode} from "@/cosmosPostgres/services/notebooks";
import {addEnrollment} from "@/cosmosPostgres/services/enrollments";

export const POST = async (req: Request) => {
    const body = await req.json();

    const { user_id, access_code } = body;

    const notebook = await getNotebookByAccessCode(access_code);

    if (!notebook) {
        return new Response("Notebook not found", { status: 404 });
    }

    return Response.json(await addEnrollment({ user_id, notebook_id: notebook.id }));
}