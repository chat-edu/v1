import {findNotesByTopicId} from "@/cosmosPostgres/services/notes";
import openai from "@/openai";

import {applicationQuestionCommand, multipleChoiceCommand, understandingQuestionCommand} from "@/prompts";
import {QuestionTypes} from "@/types/assignment/Question";
import {getAssignment} from "@/cosmosPostgres/services/assignments";
import {
    findFreeResponseQuestionsByAssignmentId,
    findMultipleChoiceQuestionsByAssignmentId
} from "@/cosmosPostgres/services/questions";

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

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Given an array of notes, generate an assignment that includes 5 questions. These questions can be either multiple choice or free response. 
    
                    Free response questions should be either understanding questions, which challenge students to demonstrate their understanding of a particular concept, or application questions, which challenge students to apply their understanding to a particular problem. 
    
                    The questions should flow logically, where completion of each question leads to the sentiment of the next question. 
    
                    The questions must be gradeable by AI later in the pipeline.
                    
                    Multiple choice questions must take the following JSON format:
                    
                   {
                        tag: "${QuestionTypes.MultipleChoice}",
                        question: ${JSON.stringify(multipleChoiceCommand.responseFormatting)}
                    }
                    
                    Understanding questions must take the following JSON format:
                    
                    {
                        tag: "${QuestionTypes.FreeResponse}",
                        question: ${JSON.stringify(understandingQuestionCommand.responseFormatting)}
                    }
                    
                    Understanding questions must take the following JSON format:
                    
                    {
                        tag: "${QuestionTypes.FreeResponse}",
                        question: ${JSON.stringify(applicationQuestionCommand.responseFormatting)}
                    }
                    
                    Notes:
                    
                    ${notes.map((note) => `
                        ${note.content}
                    `)}
                    
                    ${
                        questions.length > 0 ? `
                            The following questions have already been generated:
                            
                            ${questions.map((question) => `
                                ${question.question}
                            `)}
                        ` : ""
                    }
                    
                    The whole response should take the following format:
                    
                   {
                        name: <Assignment Name>,
                        questions: [<Question 1>, <Question 2>, ...]
                    }                 
                `,
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