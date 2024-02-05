import {deleteSummary} from "@/cosmosPostgres/services/summaries";

import {StudentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/student/[studentId]/StudentIdParams";

export const DELETE = async (req: Request, { params }: {params: StudentIdParams}) => {
    return Response.json(await deleteSummary(params.studentId, params.assignmentId));
}