import { QuestionTypes } from "@/types/assignment/Question";
import { multipleChoiceCommand, understandingQuestionCommand, applicationQuestionCommand } from "@/prompts";
import { FreeResponseQuestionRow, NoteRow } from "@/cosmosPostgres/types";

const generateAssignmentPrompt = (notes : NoteRow[], questions: FreeResponseQuestionRow[]) => {
    return `
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

        Application questions must take the following JSON format:

        {
            tag: "${QuestionTypes.FreeResponse}",
            question: ${JSON.stringify(applicationQuestionCommand.responseFormatting)}
        }

        Notes:

        ${notes.map(note => `
            ${note.content}
        `).join('')}

        ${
            questions.length > 0 ? `
                The following questions have already been generated:
                
                ${questions.map(question => `
                    ${question.question}
                `).join('')}
            ` : ""
        }

        The whole response should take the following format:

       {
            name: <Assignment Name>,
            questions: [<Question 1>, <Question 2>, ...]
        }
    `.trim();
};

export default generateAssignmentPrompt;