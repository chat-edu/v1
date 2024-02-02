import {deleteFreeResponseQuestion} from "@/cosmosPostgres/services/questions";

import {QuestionIdParams} from "@/app/api/questions/freeResponse/[questionId]/QuestionIdParams";

export const DELETE = async (req: Request, {params}: {params: QuestionIdParams}) => {
    return Response.json(await deleteFreeResponseQuestion(params.questionId));
}