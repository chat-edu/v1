import { UserAssignmentSummaryRow } from "@/cosmosPostgres/types";

const generateClassSummaryPrompt = (userAssignmentSummaries : UserAssignmentSummaryRow[]) => {
    return `
        Each student's performance on the assignment is summarized in two sentences.

        Your goal is to provide a two sentence summary of the class's performance and understanding of the course material, which will inform the teacher of their students' strengths and knowledge gaps.
        
        The summaries are as follows:

        ${userAssignmentSummaries.map(summary => JSON.stringify(summary)).join("\n")}

        Respond in the second person as if you are talking to the teacher.
        
        Respond in JSON format with the following structure:

        {
            summary: <string>
        }
        
        The summary should use markdown to format the text, bolding the most important information with asterisks.
    `.trim();
};

export default generateClassSummaryPrompt;
