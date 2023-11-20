import { addNotebook } from "@/cosmos/services/notebooks";

export async function POST(request: Request) {
    // parse the request body
    const notebook = (await request.json());

    // check if the request body contains a notebook
    if(!notebook) return Response.json({error: "No notebook provided"});
    if(!notebook.name) return Response.json({error: "No notebook name provided"});
    if(!notebook.userId) return Response.json({error: "No notebook userId provided"});

    // add the notebook
    return Response.json(await addNotebook({
        name: notebook.name,
        userId: notebook.userId,
    }));
}