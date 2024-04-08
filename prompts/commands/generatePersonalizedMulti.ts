import { QuestionTypes } from "@/types/assignment/Question";
import { multipleChoiceCommand, understandingQuestionCommand, applicationQuestionCommand } from "@/prompts";
import { MultipleChoiceQuestionRow, NoteRow } from "@/cosmosPostgres/types";

const generateFollowUpQuestionPromptMulti = (
  notes: NoteRow[],
  incorrectQuestion: MultipleChoiceQuestionRow,
  studentResponse: string
) => {
  return `
Given an array of notes and an incorrect question that the student answered, generate a follow-up question that helps the student better understand the concept they struggled with. The follow-up question should be of the same type (multiple choice, understanding, or application) as the original question.

The follow-up question should provide additional context or clarification based on the student's response, guiding them towards the correct understanding of the concept.

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

Incorrect Question:
${incorrectQuestion.question}

Student Response:
${studentResponse}

The whole response should take the following format:
{
  followUpQuestion: <Follow-up Question>
}
`.trim();
};

export default generateFollowUpQuestionPromptMulti;