import {findNotesByTopicId} from "@/cosmosPostgres/services/notes";
import openai from "@/openai";

import {applicationQuestionCommand, multipleChoiceCommand, understandingQuestionCommand} from "@/prompts";
import {QuestionTypes} from "@/types/assignment/Question";
import {getAssignment} from "@/cosmosPostgres/services/assignments";
import {
    findFreeResponseQuestionsByAssignmentId,
    findMultipleChoiceQuestionsByAssignmentId
} from "@/cosmosPostgres/services/questions";
import generateAssignmentPrompt from "@/prompts/commands/generateAssignmentPrompt";

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

    const prompt = generateAssignmentPrompt(notes, questions);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: prompt,
            }
        ],
        response_format: {
            type: "json_object",
        },
    });

    const content = response.choices[0].message.content;

    return Response.json(content ? JSON.parse(content) : {}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}