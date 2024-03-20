import { UserNotebookSummaryRow } from "@/cosmosPostgres/types";

const generateNotebookSummaryPrompt = (userNotebookSummaries : UserNotebookSummaryRow[]) => {
    return `
        Each student's performance in the class is summarized.

        Your goal is to provide a two sentence summary of the class's overall performance and understanding of the course material, which will inform the teacher of their students' strengths and knowledge gaps.

        The summaries are as follows:

        ${userNotebookSummaries.map(summary => JSON.stringify(summary)).join("\n")}

        Respond in the second person as if you are talking to the teacher.
        
        Respond in JSON format with the following structure:

        {
            summary: <string>
        }
        
        The summary should use markdown to format the text, bolding the most important information with asterisks.
    `.trim();
};

export default generateNotebookSummaryPrompt;
