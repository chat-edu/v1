// Prompt to generate a test based on the course notes and the topics specified by the teacher
// import the other question types from the commands folder so that we can use them in the prompt

export const generateTestPrompt = (content: string, topics: string[]) => `
    Generate a test based on the course notes and the topics specified by the teacher. Each question should be related to the topics covered in the notes and the questions should not repeat. 

    Make the coverage comprehensive and the questions should be well-organized. You should primarily use the topics provided by the teacher to generate the questions.

    Content: ${content}
    
    Topics: ${topics}

    Create a variety of question types, including multiple choice, true/false, short answer, and essay questions.
    Multiple choice questions should be challenging and force the user to demonstrate understanding of the topic. They SHOULD NOT simply be a definition or a fact. They should be a question that requires the user to think about the topic and apply their knowledge. Feel free to use examples of scenarios or practice examples to help the user understand the topic better. Ensure there are no ambiguities in the answers, meaning there is ONLY ONE correct answer to the problem. DO NOT include any explanation of the correct answer.
    Multiple choice questions are to be in the following format:
    {
        "question": string,
        "options": {
            "A": string,
            "B": string,
            "C": string,
            "D": string
        },
        "answer": string
    }
    Text-based application questions should ask the user to apply the concepts covered in their notes. They should be able to demonstrate their understanding of the concepts by applying them to a new situation. Create examples or practice problems based on the concepts covered in the notes. Do NOT include any indication of the answer.'    Essay questions should be challenging and force the user to demonstrate understanding of the topic. They SHOULD NOT simply be a definition or a fact. They should be a question that requires the user to think about the topic and apply their knowledge. Ensure there are no ambiguities in the answers, meaning there is ONLY ONE correct answer to the problem. DO NOT include any explanation of the correct answer.
    Application questions are to be in the following format:
    {
        "question": string
    }
    Text-based understanding questions should ask the user to demonstrate their understanding of the topics covered in their notes. They should be able to explain the concepts and why they are relevant.
    Understanding questions should be in the following format:
    {
        "question": string
    }

    Return the response as a JSON object with the following format:
    
    {
        "test": string
    }
`