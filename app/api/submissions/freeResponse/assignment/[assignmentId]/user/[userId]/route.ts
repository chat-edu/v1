import {UserIdParams} from "@/app/api/submissions/freeResponse/assignment/[assignmentId]/user/[userId]/UserIdParams";
import {findUserSubmissionsByAssignment} from "@/cosmosPostgres/services/submissions";
import {QuestionTypes} from "@/types/assignment/Question";

export const GET = async (req: Request, { params }: { params: UserIdParams }) => {
    return Response.json(await findUserSubmissionsByAssignment(params.userId, params.assignmentId, QuestionTypes.FreeResponse))
}