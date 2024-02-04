import {addSubmission} from "@/cosmosPostgres/services/submissions";
import {QuestionTypes} from "@/types/assignment/Question";

export const POST = async (req: Request) => {
    const body = await req.json();

    if(!body.answer) return new Response('Answer is required', {status: 400});
    if(!body.question_id) return new Response('Question ID is required', {status: 400});
    if(!body.user_id) return new Response('User ID is required', {status: 400});

    return Response.json(await addSubmission(body, QuestionTypes.MultipleChoice));
}