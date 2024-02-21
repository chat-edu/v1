// generateSummaryPrompt.js

import { FreeResponseQuestionRow, MultipleChoiceQuestionRow, SubmissionRow } from "@/cosmosPostgres/types";
import { QuestionMap } from "@/types/assignment/Question";

const generateSummaryPrompt = (mcqQuestions : FreeResponseQuestionRow[], frqQuestions : MultipleChoiceQuestionRow[], mcqSubmissions : SubmissionRow[], frqSubmissions : SubmissionRow[], questionMap: { [key: number]: FreeResponseQuestionRow | MultipleChoiceQuestionRow; }) => {
    return `
        The student has completed an assignment and their response has been graded.

        Your goal is to provide a two sentence summary of the student's performance, which will inform both the student and the teacher of the student's understanding and knowledge gaps.

        The questions of the assignment are as follows:

        ${[...mcqQuestions, ...frqQuestions]
            .sort((a, b) => a.question_number - b.question_number)
            .map(question => JSON.stringify(question))
            .join("\n")
        }

        The student's responses are as follows:

        ${[...mcqSubmissions, ...frqSubmissions]
            .sort((a, b) => questionMap[a.question_id].question_number - questionMap[b.question_id].question_number)
            .map(submission => JSON.stringify(submission))
            .join("\n")
        }
        
        Respond in the second person as if you are talking to the student as their tutor.

        Respond in JSON format with the following structure:

        {
            summary: <string>
        }
        
        The summary should use markdown to format the text, bolding the most important information with asterisks.
    `.trim();
};

export default generateSummaryPrompt;
