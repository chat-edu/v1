import {getMultipleChoiceQuestion} from "@/cosmosPostgres/services/questions";

import {QuestionIdParams} from "@/app/api/questions/multipleChoice/[questionId]/QuestionIdParams";

export const GET = async (req: Request, {params}: {params: QuestionIdParams}) => {
    return Response.json(await getMultipleChoiceQuestion(params.questionId))
}