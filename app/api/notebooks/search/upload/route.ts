import {NextRequest} from "next/server";

import {uploadNotebookRows} from "@/search/notebooks/upload";

import {NotebookIndexRow} from "@/search/types/NotebookIndex";

export const POST = async (req: NextRequest) => {
    const { notebooks } = await req.json();
    await uploadNotebookRows(notebooks.map((notebook: NotebookIndexRow) => ({
        id: notebook.id.toString(),
        name: notebook.name,
    })))
    return Response.json({ message: 'success'})
}