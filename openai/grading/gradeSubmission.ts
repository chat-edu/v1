import openai from "@/openai";

import {FreeResponseQuestionRow, MultipleChoiceQuestionRow} from "@/cosmosPostgres/types";
import {MultipleChoiceKey} from "@/types/commands/MultipleChoiceQuestion";
import {GradeExplanation} from "@/cosmosPostgres/types/submission";

const getAnswerTextFromKey = (key: MultipleChoiceKey, question: MultipleChoiceQuestionRow): string => {
    switch (key) {
        case "A":
            return question.option_a;
        case "B":
            return question.option_b;
        case "C":
            return question.option_c;
        case "D":
            return question.option_d;
    }
}

export const gradeMultipleChoiceQuestion = async (question: MultipleChoiceQuestionRow, answer: MultipleChoiceKey): Promise<GradeExplanation | null> => {
    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Given a multiple choice question, grade the response. Assign a points of 1 if the response is correct, and 0 if the response is incorrect.
                    
                    If the student is incorrect, provide a brief explanation of the correct answer.
                    
                    If the student is correct, congratulate them on their success.
                    
                    The explanation should be in second person. For example, "You answered incorrectly because..."
                    
                    The question is:
                    
                    ${question.question}
                    
                    The options are:
                    
                    A) ${question.option_a}
                    B) ${question.option_b}
                    C) ${question.option_c}
                    D) ${question.option_d}
                    
                    The correct answer is:
                    
                    ${question.answer}) ${getAnswerTextFromKey(question.answer, question)}
                    
                    The student's is:
                    
                    ${answer}) ${getAnswerTextFromKey(answer, question)}
                    
                    Respond in JSON format with the following structure:
                    
                    {
                        points: <0/1>,
                        grade_explanation: <string>
                    }
                `,
            }
        ],
        response_format: {
            type: "json_object",
        },
    });

    if (response.choices[0].message.content === null) {
        return null;
    }

    return JSON.parse(response.choices[0].message.content) as GradeExplanation;
}

export const gradeFreeResponseQuestion = async (question: FreeResponseQuestionRow, answer: string): Promise<GradeExplanation | null> => {
    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Given a free response question, grade the response. Assign a points of 1 if the response is correct, and 0 if the response is incorrect.
                    
                    If the student is incorrect, provide a brief explanation of the correct answer.
                    
                    If the student is correct, congratulate them on their success.
                    
                    The explanation should be in second person. For example, "You answered incorrectly because..."
                                        
                    The question is:
                    
                    ${question.question}
                    
                    The student's answer is:
                    
                    ${answer}
                    
                    Respond in JSON format with the following structure:
                    
                    {
                        points: <0/1>,
                        grade_explanation: <string>
                    }
                `,
            }
        ],
        response_format: {
            type: "json_object",
        },
    });

    if (response.choices[0].message.content === null) {
        return null;
    }

    return JSON.parse(response.choices[0].message.content) as GradeExplanation;
}