import React from 'react';

import {Button, Flex} from "@chakra-ui/react";

import TextInput from "@/components/Utilities/FormUtilities/TextInput";


import {FreeResponseQuestion} from "@/types/assignment/FreeResponseQuestion";
import useUpdateFreeResponseQuestion from "@/hooks/mutators/update/useUpdateFreeResponseQuestion";

interface Props {
    question: FreeResponseQuestion,
    changeMode: () => void,
}

const Edit: React.FC<Props> = ({ question, changeMode }) => {

    const {
        questionText,
        isChanged,
        updateQuestionText,
        saveQuestion,
    } = useUpdateFreeResponseQuestion(question);

    const onSave = async () => {
        const success = await saveQuestion();
        if (success) {
            changeMode();
        }
    }

    return (
        <Flex
            direction={'column'}
            gap={4}
            w={'100%'}
            pt={2}
        >
            <TextInput
                label={"Question"}
                placeholder={"Question"}
                value={questionText}
                onChange={updateQuestionText}
            />
            <Button
                isDisabled={!isChanged}
                onClick={onSave}
                colorScheme={'brand'}
            >
                Save
            </Button>
        </Flex>
    );
};

export default Edit;
