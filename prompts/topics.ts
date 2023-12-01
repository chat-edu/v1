export const topicsPrompt = (content: string) => (`
    Extract roughly ${Math.max(Math.floor(content.split(" ").length / wordsPerTopic), 1)} key topics from the following text. A topic should encompass a big idea or concept. There should be roughly one topic for every 500 words.
    
    Text: ${content}
    
    Return the response as a JSON object with the following format:
    
    {
        "topics": string[]
    }
`);

const wordsPerTopic = 500;