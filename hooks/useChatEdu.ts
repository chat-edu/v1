import {useChat} from "ai/react";

import {Note} from "@/types/Note";
import {useEffect} from "react";

const useOpenAi = (notes: Note[]) => {

    const { messages, input, handleInputChange, handleSubmit, data, setMessages  } = useChat({
        api: '/api/chat',
    });

    useEffect(() => {
        setMessages([
            {
                id: '1',
                content: `
                
                    You are to act as a teacher helping a student learn content they have taken notes on.
                    
                    These are the notes the student has taken so far:
                    
                    ${notes.map((note) => `
                        ${note.content}
                    `)} 
                `,
                role: 'system',
            }
        ])
    }, [notes])


    return {
        messages: messages.filter((message) => message.role !== 'system'),
        input,
        handleInputChange,
        handleSubmit,
        data
    };
}

export default useOpenAi;