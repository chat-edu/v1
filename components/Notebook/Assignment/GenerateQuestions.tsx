import React from 'react';

import {Button, Divider, Skeleton, Text, VStack} from "@chakra-ui/react";

import MultipleChoiceQuestion from "@/components/Notebook/Assignment/MultipleChoiceQuestion";
import FreeResponseQuestion from "@/components/Notebook/Assignment/FreeResponseQuestion";
import useGenerateAssignmentQuestions from "@/hooks/useGenerateAssignmentQuestions";

import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {QuestionTypes} from "@/types/assignment/Question";
import {FreeResponseQuestion as FreeResponseQuestionType} from "@/types/assignment/FreeResponseQuestion";
import {MultipleChoiceQuestion as MultipleChoiceQuestionType} from "@/types/assignment/MultipleChoiceQuestion";

interface Props {
    assignmentWithQuestions: AssignmentWithQuestions
}

const GenerateQuestions: React.FC<Props> = ({ assignmentWithQuestions }) => {

    const {
        generatedQuestions,
        loading: generationLoading,
        generateQuestions,
        addQuestionToAssignment
    } = useGenerateAssignmentQuestions(assignmentWithQuestions.id);

    if(generationLoading) return <Skeleton />

    return (
        <VStack
            w={'100%'}
            spacing={4}
            alignItems={'flex-start'}
        >
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
                            setAnswer={() => {}}
                        />
                    ) : (
                        <FreeResponseQuestion
                            key={question.question.question}
                            question={question.question as FreeResponseQuestionType}
                            onConfirm={() => addQuestionToAssignment(index, assignmentWithQuestions?.questions.length + 1)}
                            setAnswer={() => {}}
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
    );
};

export default GenerateQuestions;
