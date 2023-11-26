export const summarizePrompt = (text: string) => `
    Summarize this note into a study guide using markdown. 
    
    Use heading 1s (#) for titles, heading 2s (##) for subtitles, and heading 3s (###) for subsubtitles. 
    
    Use equations ($) for math when appropriate. Use any other markdown necessary.
    
    Text to summarize: ${text}
`