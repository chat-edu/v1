import React, { useState } from 'react';

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

    const {
        input,
        messages,
        promptType,
        correctMapping,
        handleInputChange,
        onSubmit,
        askMultipleChoiceQuestion,
        askFreeFormQuestion,
        generateStudyGuide,
        answerMultipleChoiceQuestion,
        askForHint
    } = useChatEdu(notes);

    const [showMessage, setShowMessage] = useState(true);

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
                setShowMessage={setShowMessage}
                messages={messages}
                onMultipleChoiceAnswer={answerMultipleChoiceQuestion}
                askForHint={askForHint}
                correctAnswers={correctMapping}
            />
            <InputBox
                notes={notes}
                value={input}
                handleChange={handleInputChange}
                handleSubmit={onSubmit}
                askMultipleChoice={askMultipleChoiceQuestion}
                askFreeForm={askFreeFormQuestion}
                generateStudyGuide={generateStudyGuide}
                promptType={promptType}
                showMessage={showMessage}
                setShowMessage={setShowMessage}
            />
        </Flex>
    );
};

export default Chat;
