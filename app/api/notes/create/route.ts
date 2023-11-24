import { addNote } from "@/cosmos/services/notes";

export async function POST(request: Request) {
    // parse the request body
    const note = await request.json();

    // check if the request body contains a notebook
    if(!note) return Response.json({error: "No note provided"});
    if(!note.name) return Response.json({error: "No note name provided"});
    if(!note.notebookId) return Response.json({error: "No note notebookId provided"});
    if(!note.content) return Response.json({error: "No note content provided"});

    // add the notebook
    return Response.json(await addNote({
        name: note.name,
        notebook_id: note.notebookId,
        content: note.content,
    }));
}