import {deleteMultipleChoiceQuestion} from "@/cosmosPostgres/services/questions";

import {QuestionIdParams} from "@/app/api/questions/multipleChoice/[questionId]/QuestionIdParams";

export const DELETE = async (req: Request, {params}: {params: QuestionIdParams}) => {
    return Response.json(await deleteMultipleChoiceQuestion(params.questionId))
}