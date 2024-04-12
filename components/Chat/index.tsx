import React from 'react';

import {Flex} from "@chakra-ui/react";

import InputBox from "@/components/Chat/InputBox";
import Messages from "@/components/Chat/Messages";
import ChatLanding from "@/components/Chat/ChatLanding";

import useChatEdu from "@/hooks/useChatEdu";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

interface Props {
    notebookId: Notebook['id']
    notes: Note[]
}

const Chat: React.FC<Props> = ({ notebookId, notes }) => {

    const {
        input,
        messages,
        promptType,
        answerMapping,
        isLoading,
        handleInputChange,
        onSubmit,
        promptWithCommand,
        setMessageBottomRef,
        stop
    } = useChatEdu(notebookId, notes);

    if(notes.length === 0) return (
        <ChatLanding
            notebookId={notebookId}
        />
    )

    return (
        <Flex
            flexDirection={'column'}
            w={'100%'}
            position={'relative'}
            overflow={'auto'}
            ref={setMessageBottomRef}
            h={'100%'}
        >
            <Messages
                messages={messages}
                promptWithCommand={promptWithCommand}
                answerMapping={answerMapping}
                isLoading={isLoading}
            />
            <InputBox
                notes={notes}
                value={input}
                isLoading={isLoading}
                promptType={promptType}
                showMessage={messages.length === 0}
                answerMapping={answerMapping}
                handleChange={handleInputChange}
                handleSubmit={onSubmit}
                promptWithCommand={promptWithCommand}
                stop={stop}
            />
        </Flex>
    );
};

export default Chat;
