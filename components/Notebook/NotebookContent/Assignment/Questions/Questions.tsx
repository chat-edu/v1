import React from 'react';

import {Button, Skeleton, Text, VStack} from "@chakra-ui/react";

import MultipleChoiceQuestion from "@/components/Notebook/NotebookContent/Assignment/Questions/MultipleChoiceQuestion";
import FreeResponseQuestion from "@/components/Notebook/NotebookContent/Assignment/Questions/FreeResponseQuestion";

import useUser from "@/hooks/queries/user/useUser";
import useAuth from "@/hooks/useAuth";
import useAddSubmission from "@/hooks/mutators/add/useAddSubmission";

import {MultipleChoiceQuestion as MultipleChoiceQuestionType} from "@/types/assignment/MultipleChoiceQuestion";
import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {QuestionTypes} from "@/types/assignment/Question"
import {FreeResponseQuestion as FreeResponseQuestionType} from "@/types/assignment/FreeResponseQuestion";

interface Props {
    assignmentWithQuestions: AssignmentWithQuestions
}

const Questions: React.FC<Props> = ({ assignmentWithQuestions }) => {

    const { user } = useAuth();
    const { isTeacher } = useUser(user?.id || '');

    const { setAnswer, submit, submissionLoading } = useAddSubmission(assignmentWithQuestions);

    return (
        <VStack
            w={'100%'}
            spacing={4}
            alignItems={'flex-start'}
        >
            {
                submissionLoading ? (
                    <Skeleton />
                ) : (
                    assignmentWithQuestions.questions.length > 0 ? (
                        assignmentWithQuestions.questions.map(question => (
                            question.tag === QuestionTypes.MultipleChoice ? (
                                <MultipleChoiceQuestion
                                    key={`${assignmentWithQuestions.id}-${question.question.id}-mc`}
                                    question={question.question as MultipleChoiceQuestionType}
                                    setAnswer={(answer: string) => setAnswer(question.question.id, question.tag, answer)}
                                />
                            ) : (
                                <FreeResponseQuestion
                                    key={`${assignmentWithQuestions.id}-${question.question.id}-fr`}
                                    question={question.question as FreeResponseQuestionType}
                                    setAnswer={(answer: string) => setAnswer(question.question.id, question.tag, answer)}
                                />
                            )
                        ))
                    ) : (
                        <Text>
                            No Questions
                        </Text>
                    )
                )
            }
            {
                !isTeacher && (
                    <Button
                        w={'100%'}
                        colorScheme={'brand'}
                        onClick={submit}
                        isLoading={submissionLoading}
                    >
                        Submit Assignment
                    </Button>
                )
            }
        </VStack>
    );
};

export default Questions;
