import {updateNotebookSummary} from "@/cosmosPostgres/services/summaries/notebookSummaries";

import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";
import {updateAssignmentSummary} from "@/cosmosPostgres/services/summaries";
import {AssignmentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/AssignmentIdParams";

export const PATCH = async (req: Request, { params }: {params: AssignmentIdParams}) => {
    const body = await req.json()

    if (!body.summary) return new Response("Missing summary", {status: 400});

    return Response.json(await updateAssignmentSummary(params.assignmentId,{
        summary: body.summary
    }))
}