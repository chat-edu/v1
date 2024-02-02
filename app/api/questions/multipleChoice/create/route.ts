import {addMultipleChoiceQuestion} from "@/cosmosPostgres/services/questions";

export const POST = async (req: Request) => {
    const body = await req.json();

    const {
        assignment_id,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        answer,
        question_number,
    } = body;

    if(!assignment_id || typeof assignment_id !== "number")
        return Response.json({message: "Missing assignment_id"});
    if(!question || typeof question !== "string")
        return Response.json({message: "Missing question"});
    if(!option_a || typeof option_a !== "string")
        return Response.json({message: "Missing option_a"});
    if(!option_b || typeof option_b !== "string")
        return Response.json({message: "Missing option_b"});
    if(!option_c || typeof option_c !== "string")
        return Response.json({message: "Missing option_c"});
    if(!option_d || typeof option_d !== "string")
        return Response.json({message: "Missing option_d"});
    if(!answer || typeof answer !== "string" || !(["A", "B", "C", "D"]).includes(answer))
        return Response.json({message: "Missing answer"});
    if(!question_number || typeof question_number !== "number")
        return Response.json({message: "Missing question_number"});

    const topicRow = await addMultipleChoiceQuestion({
        assignment_id,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        answer: answer as "A" | "B" | "C" | "D",
        question_number,
    });

    return Response.json(topicRow);
}