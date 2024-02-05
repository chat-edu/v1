import {AssignmentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/AssignmentIdParams";
import {findSummariesByAssignmentId} from "@/cosmosPostgres/services/summaries";

export const GET = async (req: Request, { params }: { params: AssignmentIdParams }) => {
    return Response.json(await findSummariesByAssignmentId(params.assignmentId));
}