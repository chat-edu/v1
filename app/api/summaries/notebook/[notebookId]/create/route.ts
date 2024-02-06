import {addNotebookSummary} from "@/cosmosPostgres/services/summaries/notebookSummaries";

import {generateNotebookSummary} from "@/app/api/summaries/notebook/[notebookId]/generate";

import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";

export const POST = async (req: Request, { params }: {params: NotebookIdParams}) => {
    const summary = await generateNotebookSummary(params.notebookId);

    if(summary === null) {
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    return Response.json(await addNotebookSummary({
        notebook_id: params.notebookId,
        summary: summary
    }))
}