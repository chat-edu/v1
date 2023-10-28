import React from 'react';

import {Flex} from "@chakra-ui/react";

import InputBox from "@/components/Home/Chat/InputBox";
import Messages from "@/components/Home/Chat/Messages";
import {navbarHeight} from "@/components/Navbar";

import useChatEdu from "@/hooks/useChatEdu";

import {Note} from "@/types/Note";

interface Props {
    notes: Note[]
}

const Chat: React.FC<Props> = ({ notes }) => {

    const { input, messages, handleInputChange, handleSubmit } = useChatEdu(notes);

    return (
        <Flex
            p={4}
            flexDirection={'column'}
            w={'100%'}
            position={'relative'}
            h={`calc(100vh - ${navbarHeight})`}
            overflow={'auto'}
        >
            <Messages
                messages={messages}
            />
            <InputBox
                notes={notes}
                value={input}
                handleChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </Flex>
    );
};

export default Chat;
