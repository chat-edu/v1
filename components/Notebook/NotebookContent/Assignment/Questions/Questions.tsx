import React from 'react';

import {Button, Text, VStack} from "@chakra-ui/react";

import TypewriterAnimation from "@/components/Utilities/TypewriterAnimation";

import MultipleChoiceQuestion from "@/components/Notebook/NotebookContent/Assignment/Questions/MultipleChoiceQuestion";
import FreeResponseQuestion from "@/components/Notebook/NotebookContent/Assignment/Questions/FreeResponseQuestion";

import useAddSubmission from "@/hooks/mutators/add/useAddSubmission";

import {useCurrentUser} from "@/contexts/CurrentUserContext";

import {MultipleChoiceQuestion as MultipleChoiceQuestionType} from "@/types/assignment/MultipleChoiceQuestion";
import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {QuestionTypes} from "@/types/assignment/Question"
import {FreeResponseQuestion as FreeResponseQuestionType} from "@/types/assignment/FreeResponseQuestion";

interface Props {
    assignmentWithQuestions: AssignmentWithQuestions
}

const Questions: React.FC<Props> = ({ assignmentWithQuestions }) => {

    const { isTeacher } = useCurrentUser();

    const { setAnswer, submit, submissionLoading } = useAddSubmission(assignmentWithQuestions);

    return (
        <VStack
            w={'100%'}
            spacing={4}
            alignItems={'flex-start'}
        >
            {
                submissionLoading ? (
                    <VStack
                        w={'100%'}
                    >
                        <TypewriterAnimation
                            subtexts={[
                                "Discovering the brilliance in your answers...",
                                "Unveiling the gems in your assignment...",
                                "Celebrating the effort you've put in...",
                                "Admiring the creativity of your work...",
                                "Appreciating the knowledge you've showcased...",
                                "Commending the insights in your responses...",
                                "Acknowledging the hard work behind your answers...",
                                "Marveling at the depth of your understanding...",
                                "Valuing the thoughtfulness in your assignment...",
                                "Respecting the dedication in your study journey..."
                            ]}
                         />
                    </VStack>
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
