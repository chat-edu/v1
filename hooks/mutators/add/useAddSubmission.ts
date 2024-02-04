import {useState} from "react";

import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {QuestionTypes} from "@/types/assignment/Question";
import useAuth from "@/hooks/useAuth";
import {addSubmission} from "@/services/submissions";
import {useToast} from "@chakra-ui/react";

interface Answers {
    [key: string]: string
}

const useAddSubmission = (assignmentWithQuestions: AssignmentWithQuestions) => {

    const toast = useToast();

    const { user } = useAuth();

    const [answers, setAnswers] = useState<Answers>({});

    const setAnswer = (questionId: number, questionType: QuestionTypes, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [`${questionType}-${questionId}`]: answer
        }))
    }

    const submit = async () => {
        if(!user) return null;
        const submissionRows = await Promise.all(Object.keys(answers).map(key => {
            const [questionType, questionId] = key.split('-');
            return addSubmission({
                userId: user.id,
                questionId: parseInt(questionId),
                answer: answers[key]
            }, questionType as QuestionTypes)
        }));
        if(submissionRows.some(row => !row)) {
            toast({
                title: "Error",
                description: "There was an error submitting your answers",
                status: "error",
                duration: 5000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: "Your answers have been submitted",
                status: "success",
                duration: 5000,
                isClosable: true
            })
        }
    }

    return {
        answers,
        setAnswer,
        submit
    }
}

export default useAddSubmission;