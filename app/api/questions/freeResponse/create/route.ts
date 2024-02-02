import {addFreeResponseQuestion} from "@/cosmosPostgres/services/questions";

export const POST = async (req: Request) => {
    const body = await req.json();

    const {
        assignment_id,
        question,
        question_number,
    } = body;

    if(!assignment_id || typeof assignment_id !== "number")
        return Response.json({message: "Missing assignment_id"});
    if(!question || typeof question !== "string")
        return Response.json({message: "Missing question"});
    if(!question_number || typeof question_number !== "number")
        return Response.json({message: "Missing question_number"});

    return Response.json(await addFreeResponseQuestion({
        assignment_id,
        question,
        question_number,
    }))
}