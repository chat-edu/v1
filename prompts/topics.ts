export const extractTopicsPrompt = (content: string) => `

    Analyze the following class notes. 
    
    If the notes are short and focused on a specific topic, identify the pme or two most central concepts. 
    
    If the notes are longer and cover multiple topics, list the key concepts or main topics covered.
    
    Content: ${content}
    
    Return the response as a JSON object with the following format:
    
    {
        "topics": string[]
    }
`

export const generateNoteForTopicPrompt = (topic: string, note: string) => `
    Given the topic "${topic}", generate a note that summarizes the information about this topic in the provided text. Only include information about this topic. Do not include information about other topics.
    
    The summary should make the note easy to read, so it should be well-organized. You can change the formatting of the original text.
    
    Use markdown to format the note, including headings, bullet points, and bolded text.
    
    For any math or equations, use LaTeX to format the math. Wrap them in $ signs to indicate that they are math. For example, $x^2$.
    
    For any code, use markdown to format the code.
    
    Provided text: ${note}
`

