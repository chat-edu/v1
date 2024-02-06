import {findUserAssignmentSummariesByAssignmentId} from "@/cosmosPostgres/services/summaries";
import openai from "@/openai";

import {Assignment} from "@/types/assignment/Assignment";

export const generateAssignmentSummary = async (assignmentId: Assignment["id"]): Promise<string | null> => {
    const userAssignmentSummaries = await findUserAssignmentSummariesByAssignmentId(assignmentId);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Each student's performance on the assignment is summarized in two sentences.

                    Your goal is to provide a two sentence summary of the class's performance and understanding of the course material, which will inform the teacher of their students' strengths and knowledge gaps.
                    
                    The summaries are as follows:

                    ${userAssignmentSummaries.map((summary) => JSON.stringify(summary)).join("\n")}

                    Respond in the second person as if you are talking to the teacher.
                    
                    Respond in JSON format with the following structure:

                    {
                        summary: <string>
                    }
                    
                    The summary should use markdown to format the text, bolding the most important information with asterisks.
                `,
            }
        ],
        response_format: {
            type: "json_object",
        },
    });

    if(response.choices[0].message.content === null) {
        return null;
    }

    return JSON.parse(response.choices[0].message.content).summary;
}