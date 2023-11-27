import { addNotebook } from "@/azure/cosmos/services/notebooks";

export async function POST(request: Request) {
    const notebook = (await request.json());

    if(!notebook) return Response.json(false);
    if(!notebook.name) return Response.json(false);
    if(!notebook.userId) return Response.json(false);

    return Response.json(await addNotebook({
        name: notebook.name,
        user_id: notebook.userId,
    }));
}