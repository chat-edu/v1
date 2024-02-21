import { UserAssignmentSummaryRow, UserRow } from "@/cosmosPostgres/types";

const generateUserNotebookSummaryPrompt = (user : UserRow, userAssignmentSummaries : UserAssignmentSummaryRow[]) => {
    return `
        The student has completed several assignments and their responses have been graded and summarized.
        
        The student's name is *${user.name}*.

        Your goal is to provide a two sentence summary of the student's performance and understanding of the class material, which will inform the teacher of the student's understanding and knowledge gaps.

        The summaries are as follows:

        ${userAssignmentSummaries.map(summary => JSON.stringify(summary)).join("\n")}

        Respond in the second person as if you informing the teacher of the student's performance.
    
        Respond in JSON format with the following structure:

        {
            summary: <string>
        }
        
        The summary should use markdown to format the text, bolding the most important information with asterisks.
    `.trim();
};

export default generateUserNotebookSummaryPrompt;