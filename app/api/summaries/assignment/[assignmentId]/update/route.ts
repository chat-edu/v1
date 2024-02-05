import {updateAssignmentSummary} from "@/cosmosPostgres/services/summaries";
import {generateAssignmentSummary} from "@/app/api/summaries/assignment/[assignmentId]/generate";

import {AssignmentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/AssignmentIdParams";

export const PATCH = async (req: Request, { params }: {params: AssignmentIdParams}) => {
    const summary = await generateAssignmentSummary(params.assignmentId);

    if(summary === null) {
        return new Response("No response from GPT-4", {status: 500});
    }

    return Response.json(await updateAssignmentSummary(params.assignmentId,{
        summary
    }))
}