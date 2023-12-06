import React from 'react';

import {Container, Flex} from "@chakra-ui/react";

import InputBox from "@/components/Chat/InputBox";
import Messages from "@/components/Chat/Messages";

import {mobileHeaderHeight} from "@/components/Notebook/NotebookMenu/MobileHeader";
import {mobileNavbarHeight, navbarHeight} from "@/components/Layout/Navbar";

import useChatEdu from "@/hooks/useChatEdu";

import {Note} from "@/types/Note";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";
import ChatLanding from "@/components/Chat/ChatLanding";
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

    const { height } = useViewportDimensions();

    if(notes.length === 0) return (
        <ChatLanding />
    )

    return (
        <Container
            w={'100%'}
            maxW={'6xl'}
            p={0}
            h={{
                base: height - mobileNavbarHeight - mobileHeaderHeight,
                md: height - navbarHeight
            }}
        >
            <Flex
                p={{
                    base: 0,
                    md: 4
                }}
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
        </Container>
    );
};

export default Chat;
