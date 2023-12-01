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
    
    Text: ${note}
    
    Use markdown to format the note, including headings, bullet points, math equations, and code blocks.
`

