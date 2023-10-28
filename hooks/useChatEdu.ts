import {useChat} from "ai/react";

const useOpenAi = () => {

    const { messages, input, handleInputChange, handleSubmit, data,  } = useChat({
        api: '/api/chat',
    });

    return { messages, input, handleInputChange, handleSubmit, data };
}

export default useOpenAi;