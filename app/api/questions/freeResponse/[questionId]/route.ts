import {getFreeResponseQuestion} from "@/cosmosPostgres/services/questions";

import {QuestionIdParams} from "@/app/api/questions/freeResponse/[questionId]/QuestionIdParams";

export const GET = async (req: Request, {params}: {params: QuestionIdParams}) => {
    return Response.json(await getFreeResponseQuestion(params.questionId));
}