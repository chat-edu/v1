interface Note {
    name: string;
    content: string;
  }
  
  interface Topic {
    name?: string;
  }
  
  interface Notebook {
    name?: string;
  }
  
  // Define the function to generate the prompt
  export const generatePrompt = (note: Note, parentTopic?: Topic, notebook?: Notebook): string => {
    return `
      Your goal is to generate more content for a note about ${note.name} on the topic of ${parentTopic?.name || 'the topic'}.
      
      The note is part of a class about ${notebook?.name || 'the notebook'}.
  
      The note is ${
        note.content.length === 0
          ? "currently empty. Create a note that will be used to teach students."
          : `currently as follows: ${note.content}. Continue by adding more information to the note`
      }
  
      Provide a response in Markdown format.
      
      The response should be in the following JSON format:
          
      {
          generatedContent: <string>
      }
    `.trim();
  };
  