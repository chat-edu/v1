import {useMemo, useState} from "react";

import {useToast} from "@chakra-ui/react";

import {updateMultipleChoiceQuestion} from "@/services/questions";

import {MultipleChoiceKey, MultipleChoiceOptions} from "@/types/commands/MultipleChoiceQuestion";
import {MultipleChoiceQuestion} from "@/types/assignment/MultipleChoiceQuestion";

const useUpdateMultipleChoiceQuestion = (question: MultipleChoiceQuestion) => {

    const toast = useToast();

    const [questionText, setQuestionText] = useState<string>(question.question);
    const [options, setOptions] = useState<MultipleChoiceOptions>(question.options);
    const [correctOption, setCorrectOption] = useState<MultipleChoiceKey>(question.answer);

    const isChanged = useMemo(() => {
        return questionText !== question.question ||
            options !== question.options ||
            correctOption !== question.answer;
    }, [questionText, options, correctOption, question]);

    const updateQuestionText = (newQuestionText: string) => {
        setQuestionText(newQuestionText);
    }

    const updateOption = (optionKey: MultipleChoiceKey, newOption: string) => {
        setOptions({
            ...options,
            [optionKey]: newOption
        })
    }

    const updateCorrectOption = (newCorrectOption: MultipleChoiceKey) => {
        setCorrectOption(newCorrectOption);
    }

    const saveQuestion = async () => {
        const success = await updateMultipleChoiceQuestion(question.id, {
            question: questionText,
            options,
            answer: correctOption
        }, question.assignmentId)
        if (success) {
            toast({
                title: "Question updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Question update failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        return success;
    }

    return {
        questionText,
        options,
        correctOption,
        isChanged,
        updateQuestionText,
        updateOption,
        updateCorrectOption,
        saveQuestion
    }
}

export default useUpdateMultipleChoiceQuestion;