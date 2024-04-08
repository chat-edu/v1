import { NoteRow, NotebookRow, TopicRow } from '@/cosmosPostgres/types';

// Define the function to generate the prompt
export const generateSyllabusPrompt = (syllabus: string, notebook?: NotebookRow | null): string => {
  return `
Your goal is to generate a list of topics based on the provided syllabus for the class about ${notebook?.name || 'the notebook'}.

The syllabus is as follows:
${syllabus}

Analyze the syllabus and extract the main topics covered in the course. Each topic should be a concise phrase or sentence that summarizes a key concept or area of study.

Provide a response in the following JSON format:
{
  topics: [
    {
      name: <string>,
      description: <string>
    },
    ...
  ]
}
`.trim();
};