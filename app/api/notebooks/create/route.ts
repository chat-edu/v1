import { addNotebook } from "@/cosmosPostgres/services/notebooks";
import {uploadNotebookRows} from "@/search/notebooks/upload";

export async function POST(request: Request) {
    const notebook = (await request.json());

    if(!notebook) return Response.json(false);
    if(!notebook.name) return Response.json(false);
    if(!notebook.user_id) return Response.json(false);

    const notebookRow = await addNotebook({
        name: notebook.name,
        user_id: notebook.user_id,
    });

    if(!notebookRow) return Response.json(null);
    
    await uploadNotebookRows([{
        id: notebookRow.id.toString(),
        name: notebookRow.name,
    }])

    return Response.json(notebookRow);
}