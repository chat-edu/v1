import {deleteNotebookSummary} from "@/cosmosPostgres/services/summaries/notebookSummaries";

import {AssignmentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/AssignmentIdParams";
import {deleteAssignmentSummary} from "@/cosmosPostgres/services/summaries";

export const DELETE = async (req: Request, { params }: {params: AssignmentIdParams}) => {
    return Response.json(await deleteAssignmentSummary(params.assignmentId))
}