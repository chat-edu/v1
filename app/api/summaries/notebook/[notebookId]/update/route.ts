import {updateNotebookSummary} from "@/cosmosPostgres/services/summaries/notebookSummaries";

import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";
import {generateNotebookSummary} from "@/app/api/summaries/notebook/[notebookId]/generate";
import {Model} from "@/types/Model";

export const PATCH = async (req: Request, { params }: {params: NotebookIdParams}) => {

    const body = await req.json();

    const summary = await generateNotebookSummary(params.notebookId, body.model || Model.OPENAI);

    if(summary === null) {
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    return Response.json(await updateNotebookSummary(params.notebookId,{
        summary
    }))
}