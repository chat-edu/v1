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
        askForHint,
        setMessageBottomRef
    } = useChatEdu(notes);

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
                onMultipleChoiceAnswer={answerMultipleChoiceQuestion}
                askForHint={askForHint}
                correctAnswers={correctMapping}
                setRef={setMessageBottomRef}
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
            />
        </Flex>
    );
};

export default Chat;
