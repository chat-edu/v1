import React from 'react';

import {Button, Flex, FormControl, FormLabel, Radio, RadioGroup, Stack} from "@chakra-ui/react";

import TextInput from "@/components/Utilities/FormUtilities/TextInput";

import useUpdateMultipleChoiceQuestion from "@/hooks/mutators/update/useUpdateMultipleChoiceQuestion";

import {MultipleChoiceKey} from "@/types/commands/MultipleChoiceQuestion";
import {MultipleChoiceQuestion} from "@/types/assignment/MultipleChoiceQuestion";

interface Props {
    question: MultipleChoiceQuestion,
    changeMode: () => void,
}

const Edit: React.FC<Props> = ({ question, changeMode }) => {

    const {
        questionText,
        options,
        correctOption,
        isChanged,
        updateQuestionText,
        updateOption,
        updateCorrectOption,
        saveQuestion,
    } = useUpdateMultipleChoiceQuestion(question);

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
            {
                Object.keys(options).map((option) => (
                    <TextInput
                        key={option}
                        label={`Option ${option}`}
                        placeholder={`Option ${option}`}
                        value={options[option as MultipleChoiceKey]}
                        onChange={(value) => updateOption(option as MultipleChoiceKey, value)}
                    />
                ))
            }
            <FormControl
                w={'100%'}
                alignItems={'flex-start'}
            >
                <FormLabel>
                    Correct Answer
                </FormLabel>
                <RadioGroup
                    onChange={updateCorrectOption}
                    value={correctOption}
                    colorScheme={'brand'}
                >
                    <Stack
                        direction='row'
                        spacing={4}
                    >
                        {
                            Object.keys(options).map((option) => (
                                <Radio key={option} value={option}>
                                    {option}
                                </Radio>
                            ))
                        }
                    </Stack>
                </RadioGroup>
            </FormControl>
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
