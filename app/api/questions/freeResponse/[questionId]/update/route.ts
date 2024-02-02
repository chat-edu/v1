import {updateFreeResponseQuestion} from "@/cosmosPostgres/services/questions";

import {QuestionIdParams} from "@/app/api/questions/freeResponse/[questionId]/QuestionIdParams";
import {FreeResponseQuestionRow} from "@/cosmosPostgres/types";

export const PATCH = async (req: Request, {params}: {params: QuestionIdParams}) => {
    const body = await req.json();

    const {
        question,
        question_number,
    } = body;

    const updatedQuestion: Partial<FreeResponseQuestionRow> = {};
    if (question) updatedQuestion.question = question;
    if (question_number) updatedQuestion.question_number = question_number;

    return Response.json(await updateFreeResponseQuestion(params.questionId, updatedQuestion));
}