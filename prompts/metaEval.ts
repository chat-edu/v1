// Prompt that takes in the evaluations of several students and outputs actionable, class-wide feedback based on the course notes and topics
// Evaluations should be an array of student evals

export const metaEvalPrompt = (content: string, evaluations: string[]) => `
    Evaluate the student's responses and result on an examination of several questions that highlights the specific areas for improvement based on the course notes. 

    Content: ${content}
    
    Evaluations: ${evaluations}
    
    Return the response as a JSON object with the following format:
    
    {
        "metaEvaluation": string
    }
`