import {findNotesByTopicId} from "@/cosmosPostgres/services/notes";
import {getAssignment} from "@/cosmosPostgres/services/assignments";
import {
    findFreeResponseQuestionsByAssignmentId,
    findMultipleChoiceQuestionsByAssignmentId
} from "@/cosmosPostgres/services/questions";
import generateAssignmentPrompt from "@/prompts/commands/generateAssignmentPrompt";
import {generateWithSystemPrompt} from "@/llm";
import {Model} from "@/types/Model";

export const POST = async (req: Request) => {
    const body = await req.json();

    if(!body.assignmentId) {
        return new Response("No assignment id provided", {
            status: 400
        })
    }

    const assignment = await getAssignment(body.assignmentId);

    if(!assignment) {
        return new Response("No assignment found", {
            status: 404
        })
    }

    const [notes, multipleChoiceQuestions, freeResponseQuestions] = await Promise.all([
        findNotesByTopicId(assignment.topic_id),
        findMultipleChoiceQuestionsByAssignmentId(assignment.id),
        findFreeResponseQuestionsByAssignmentId(assignment.id)
    ]);

    const questions = [...multipleChoiceQuestions, ...freeResponseQuestions]
        .sort((a, b) => a.question_number - b.question_number);

    const content = await generateWithSystemPrompt(generateAssignmentPrompt(notes, questions), body.model || Model.OPENAI);

    return Response.json(content ? JSON.parse(content) : {}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}