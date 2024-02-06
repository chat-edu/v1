import React from 'react';

import {Button, Divider, Text, VStack} from "@chakra-ui/react";

import MultipleChoiceQuestion from "@/components/Notebook/NotebookContent/Assignment/Questions/MultipleChoiceQuestion";
import FreeResponseQuestion from "@/components/Notebook/NotebookContent/Assignment/Questions/FreeResponseQuestion";

import useGenerateAssignmentQuestions from "@/hooks/useGenerateAssignmentQuestions";

import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {QuestionTypes} from "@/types/assignment/Question";
import {FreeResponseQuestion as FreeResponseQuestionType} from "@/types/assignment/FreeResponseQuestion";
import {MultipleChoiceQuestion as MultipleChoiceQuestionType} from "@/types/assignment/MultipleChoiceQuestion";
import TypewriterAnimation from "@/components/Utilities/TypewriterAnimation";

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

    if(generationLoading) return (
        <TypewriterAnimation
            subtexts={[
                "Brewing some fresh questions from your notes...",
                "Turning your notes into brain teasers...",
                "Sifting through knowledge, one note at a time...",
                "Whipping up some educational challenges...",
                "Translating your notes into quiz magic...",
                "Harvesting the seeds of knowledge from your notes...",
                "Crafting custom questions from your classroom insights...",
                "Concocting a quiz cocktail from your notes...",
                "Weaving your notes into thought-provoking puzzles...",
                "Mixing your notes into a potion of knowledge..."
            ]}
        />
    )

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
                Generate Questions
            </Button>
        </VStack>
    );
};

export default GenerateQuestions;
