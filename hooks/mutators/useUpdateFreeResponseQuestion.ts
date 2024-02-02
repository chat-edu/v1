import {useMemo, useState} from "react";

import {useToast} from "@chakra-ui/react";

import {updateFreeResponseQuestion} from "@/services/questions";

import {FreeResponseQuestion} from "@/types/assignment/FreeResponseQuestion";

const useUpdateFreeResponseQuestion = (question: FreeResponseQuestion) => {

    const toast = useToast();

    const [questionText, setQuestionText] = useState<string>(question.question);

    const isChanged = useMemo(() => {
        return questionText !== question.question
    }, [questionText, question]);

    const updateQuestionText = (newQuestionText: string) => {
        setQuestionText(newQuestionText);
    }

    const saveQuestion = async () => {
        const success = await updateFreeResponseQuestion(question.id, {
            question: questionText,
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
        isChanged,
        updateQuestionText,
        saveQuestion
    }
}

export default useUpdateFreeResponseQuestion;