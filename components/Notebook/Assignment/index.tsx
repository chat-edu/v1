import React from 'react';

import {Card, Text, Skeleton, VStack, Box, Button, Divider} from "@chakra-ui/react";

import MultipleChoiceQuestion from "@/components/Notebook/Assignment/MultipleChoiceQuestion";
import FreeResponseQuestion from "@/components/Notebook/Assignment/FreeResponseQuestion";
import AssignmentHeader from "@/components/Notebook/Assignment/AssignmentHeader";

import useAssignment from "@/hooks/queries/assignment/useAssignment";

import { Assignment as AssignmentType } from "@/types/assignment/Assignment";
import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from "@/types/assignment/MultipleChoiceQuestion";
import { FreeResponseQuestion as FreeResponseQuestionType } from "@/types/assignment/FreeResponseQuestion";
import { QuestionTypes } from "@/types/assignment/Question";
import useGenerateAssignmentQuestions from "@/hooks/useGenerateAssignmentQuestions";

interface Props {
    assignment: AssignmentType,
}

const Assignment: React.FC<Props> = ({ assignment }) => {

    const { assignmentWithQuestions, loading } = useAssignment(assignment.id);

    const {
        generatedQuestions,
        loading: generationLoading,
        generateQuestions,
        addQuestionToAssignment
    } = useGenerateAssignmentQuestions(assignment.id);

    return (
        <Box
            p={4}
            w={'100%'}
        >
            <Card
                w={'100%'}
                gap={4}
            >
                {
                    loading && !assignmentWithQuestions ? (
                        <Skeleton />
                    ) : (
                        assignmentWithQuestions ? (
                            <>
                                <AssignmentHeader assignment={assignmentWithQuestions} />
                                {
                                    <VStack
                                        w={'100%'}
                                        spacing={8}
                                        alignItems={'flex-start'}
                                    >
                                        {
                                            assignmentWithQuestions.questions.length > 0 ? (
                                                assignmentWithQuestions.questions.map(question => (
                                                    question.tag === QuestionTypes.MultipleChoice ? (
                                                        <MultipleChoiceQuestion
                                                            key={`${assignment.id}-${question.question.id}-mc`}
                                                            question={question.question as MultipleChoiceQuestionType}
                                                        />
                                                    ) : (
                                                        <FreeResponseQuestion
                                                            key={`${assignment.id}-${question.question.id}-fr`}
                                                            question={question.question as FreeResponseQuestionType}
                                                        />
                                                    )
                                                ))
                                            ) : (
                                                <Text>
                                                    No Questions
                                                </Text>
                                            )
                                        }
                                        {
                                            generationLoading && (
                                                <Skeleton />
                                            )
                                        }
                                        {
                                            generatedQuestions.length > 0 && (
                                                <>
                                                    <Divider />
                                                    <VStack
                                                        w={'100%'}
                                                        spacing={2}
                                                        alignItems={'flex-start'}
                                                    >
                                                        <Text
                                                            fontSize={'xl'}
                                                            fontWeight={'bold'}
                                                        >
                                                            Generated Questions
                                                        </Text>
                                                        <Text>
                                                            Here are some questions that you can add to your assignment. Confirm the questions you want to add.
                                                        </Text>
                                                    </VStack>
                                                </>
                                            )
                                        }
                                        {
                                            generatedQuestions.map((question, index) => (
                                                question.tag === QuestionTypes.MultipleChoice ? (
                                                    <MultipleChoiceQuestion
                                                        key={question.question.question}
                                                        question={question.question as MultipleChoiceQuestionType}
                                                        onConfirm={() => addQuestionToAssignment(index, assignmentWithQuestions?.questions.length + 1)}
                                                    />
                                                ) : (
                                                    <FreeResponseQuestion
                                                        key={question.question.question}
                                                        question={question.question as FreeResponseQuestionType}
                                                        onConfirm={() => addQuestionToAssignment(index, assignmentWithQuestions?.questions.length + 1)}
                                                    />
                                                )
                                            ))
                                        }
                                        <Button
                                            w={'100%'}
                                            colorScheme={'brand'}
                                            onClick={generateQuestions}
                                            isLoading={generationLoading}
                                        >
                                            Add Questions
                                        </Button>
                                    </VStack>
                                }
                            </>
                        ) : (
                            <Text>
                                No Assignment Found
                            </Text>
                        )
                    )
                }
            </Card>
        </Box>
    );
};

export default Assignment;
