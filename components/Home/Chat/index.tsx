import React from 'react';

import {Container, Flex} from "@chakra-ui/react";

import InputBox from "@/components/Home/Chat/InputBox";
import Messages from "@/components/Home/Chat/Messages";

import {mobileHeaderHeight} from "@/components/Home/NotesMenu/MobileHeader";
import {navbarHeight} from "@/components/Navbar";

import useChatEdu from "@/hooks/useChatEdu";

import {Note} from "@/types/Note";

interface Props {
    notes: Note[]
}

const Chat: React.FC<Props> = ({ notes }) => {

    const {
        input,
        messages,
        promptType,
        correctMapping,
        isLoading,
        handleInputChange,
        onSubmit,
        promptWithCommand,
        setMessageBottomRef
    } = useChatEdu(notes);

    return (
        <Container
            w={'100%'}
            maxW={'6xl'}
            p={0}
            h={{
                base: window.innerHeight - navbarHeight - mobileHeaderHeight,
                md: window.innerHeight - navbarHeight
            }}
        >
            <Flex
                p={{
                    base: 2,
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
                    correctAnswers={correctMapping}
                    isLoading={isLoading}
                />
                <InputBox
                    notes={notes}
                    value={input}
                    isLoading={isLoading}
                    promptType={promptType}
                    showMessage={messages.length === 0}
                    correctAnswers={correctMapping}
                    handleChange={handleInputChange}
                    handleSubmit={onSubmit}
                    promptWithCommand={promptWithCommand}
                />
            </Flex>
        </Container>
    );
};

export default Chat;
