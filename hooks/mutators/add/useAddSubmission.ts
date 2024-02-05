import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import useAuth from "@/hooks/useAuth";

import {addSubmission, gradeSubmission} from "@/services/submissions";

import {emitAssignmentChangedEvent} from "@/cosmosPostgres/eventEmitters/assignmentEventEmitter";

import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {QuestionTypes} from "@/types/assignment/Question";
import {generateUserAssignmentSummary} from "@/services/summaries";

interface Answers {
    [key: string]: string
}

const useAddSubmission = (assignmentWithQuestions: AssignmentWithQuestions) => {

    const toast = useToast();

    const { user } = useAuth();

    const [answers, setAnswers] = useState<Answers>({});
    const [submissionLoading, setSubmissionLoading] = useState(false);

    const setAnswer = (questionId: number, questionType: QuestionTypes, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [`${questionType}-${questionId}`]: answer
        }))
    }

    const submit = async () => {
        if(!user) return null;
        setSubmissionLoading(true);
        const successes = await Promise.all(Object.keys(answers).map(async key => {
            const [questionType, questionId] = key.split('-');
            const submissionRow = await addSubmission({
                userId: user.id,
                questionId: parseInt(questionId),
                answer: answers[key]
            }, questionType as QuestionTypes)
            return gradeSubmission(submissionRow.id, questionType as QuestionTypes);
        }));
        const success = !successes.some(success => !success);
        if(success) {
            await generateUserAssignmentSummary(user.id, assignmentWithQuestions.id);
            toast({
                title: "Success",
                description: "Your answers have been submitted",
                status: "success",
                duration: 5000,
                isClosable: true
            })
            emitAssignmentChangedEvent(assignmentWithQuestions.id)
        } else {
            toast({
                title: "Error",
                description: "There was an error submitting your answers",
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
        setSubmissionLoading(false);
    }

    return {
        answers,
        submissionLoading,
        setAnswer,
        submit
    }
}

export default useAddSubmission;