import {updateNotebookSummary} from "@/cosmosPostgres/services/summaries/notebookSummaries";

import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";
import {generateNotebookSummary} from "@/app/api/summaries/notebook/[notebookId]/generate";

export const PATCH = async (req: Request, { params }: {params: NotebookIdParams}) => {
    const summary = await generateNotebookSummary(params.notebookId);

    if(summary === null) {
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    return Response.json(await updateNotebookSummary(params.notebookId,{
        summary
    }))
}