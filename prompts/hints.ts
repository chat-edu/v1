export const hintPromptTag = 'Hint Prompt';

export const hintResponseTag = 'Hint Response';

export const hintPrePrompt = `
    Content: Hints should be helpful but should not give away the answer. Do NOT too much information as the user should still be able to solve the problem on their own.
    
    Formatting: Hints must be in markdown and should use heading 1s, 2s, and 3s, and bullet points to organize the content. They MUST be in the following format:
    
    ${hintResponseTag}: <content>
`

export const hintPrompt = `${hintPromptTag}: Please provide a hint for the user.`