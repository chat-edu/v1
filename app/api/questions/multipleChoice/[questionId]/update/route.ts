import {QuestionIdParams} from "@/app/api/questions/multipleChoice/[questionId]/QuestionIdParams";
import {updateMultipleChoiceQuestion} from "@/cosmosPostgres/services/questions";
import {MultipleChoiceQuestionRowInput} from "@/cosmosPostgres/types";

export const PATCH = async (req: Request, {params}: {params: QuestionIdParams}) => {
    const body = await req.json();

    const {
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        answer,
        question_number,
    } = body;

    const updatedQuestion: Partial<MultipleChoiceQuestionRowInput> = {};
    if (question) updatedQuestion.question = question;
    if (option_a) updatedQuestion.option_a = option_a;
    if (option_b) updatedQuestion.option_b = option_b;
    if (option_c) updatedQuestion.option_c = option_c;
    if (option_d) updatedQuestion.option_d = option_d;
    if (answer) updatedQuestion.answer = answer;
    if (question_number) updatedQuestion.question_number = question_number;

    return Response.json(await updateMultipleChoiceQuestion(params.questionId, updatedQuestion))
}