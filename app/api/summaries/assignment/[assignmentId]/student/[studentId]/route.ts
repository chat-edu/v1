import {getSummary} from "@/cosmosPostgres/services/summaries";

import {StudentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/student/[studentId]/StudentIdParams";

export const GET = async (req: Request, { params }: {params: StudentIdParams}) => {
    return Response.json(await getSummary(params.studentId, params.assignmentId));
}