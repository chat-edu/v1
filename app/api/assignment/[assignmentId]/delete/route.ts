import {deleteAssignment} from "@/cosmosPostgres/services/assignments";

import {AssignmentIdParams} from "@/app/api/assignment/[assignmentId]/AssignmentIdParams";

export const DELETE = async (req: Request, {params}: {params: AssignmentIdParams}) => {
    return Response.json(await deleteAssignment(params.assignmentId));
}