// Prompt to evaluate student's responses and result on an examination of several questions that highlights the specific areas for improvement based on the course notes.
export const evaluateExamPromptWithNotes = (content: string, notes: string) => `
    Evaluate the student's responses and result on an examination of several questions that highlights the specific areas for improvement based on the course notes. 

    Content: ${content}
    
    Notes: ${notes}
    
    Return the response as a JSON object with the following format:
    
    {
        "evaluation": string
    }
`