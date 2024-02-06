import React, {useMemo} from 'react';


import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel, Divider,
    Flex,
    HStack, Skeleton,
    Text, VStack
} from "@chakra-ui/react";

import SubmissionSummary from "@/components/Notebook/NotebookContent/Assignment/Submissions/SubmissionSummary";

import useAssignment from "@/hooks/queries/assignment/useAssignment";

import {UserSubmission} from "@/types/Submission";
import {Question, QuestionMap, QuestionTypes} from "@/types/assignment/Question";

interface Props {
    submission: UserSubmission
}

const StudentSubmission: React.FC<Props> = ({ submission }) => {

    const { assignmentWithQuestions, loading } = useAssignment(submission.assignmentId);

    const questionMap: QuestionMap = useMemo(() => {
        const map: { [key: number]: Question<any> } = {};
        console.log(assignmentWithQuestions?.questions)
        assignmentWithQuestions?.questions.forEach(question => {
            map[question.question.id] = question;
        });
        return map;
    }, [assignmentWithQuestions?.questions]);

    const scorePercentage = submission.submissions.reduce((acc, submission) => acc + (submission.points ? submission.points : 0), 0) / submission.submissions.length;

    const accentColor = scorePercentage > 0.8 ? 'green.500' : scorePercentage > 0.6 ? 'yellow.500' : 'red.500';

    if(loading || Object.keys(questionMap).length === 0) {
        return (
            <Skeleton
                h={20}
                w={'100%'}
            />
        )
    }

    console.log(questionMap)

    return (
        <Flex
            w={'100%'}
            direction={'column'}
            align={'flex-start'}
            borderWidth={2}
            borderColor={accentColor}
            rounded={'md'}
            p={4}
            gap={4}
        >
            <HStack
                w={'100%'}
                justify={'space-between'}
            >
                <Text
                    fontSize={'xl'}
                    fontWeight={'bold'}
                >
                    {assignmentWithQuestions?.name}
                </Text>
                <Text
                    fontSize={'xl'}
                    fontWeight={'bold'}
                    color={accentColor}
                >
                    {(scorePercentage * 100).toFixed(2)}%
                </Text>
            </HStack>
            <SubmissionSummary
                userId={submission.userId}
                assignmentId={submission.assignmentId}
            />
            <Accordion
                allowToggle
                w={'100%'}
            >
                <AccordionItem>
                    <AccordionButton
                        w={'100%'}
                    >
                        View Graded Questions
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <VStack>
                            {
                                submission.submissions.map((questionSubmission, index) => (
                                    <VStack
                                        key={`${questionSubmission.questionType}-${questionSubmission.id}`}
                                        w={'100%'}
                                        align={'flex-start'}
                                    >
                                        <Divider />
                                        <Text
                                            fontWeight={'semibold'}
                                            fontStyle={'italic'}
                                        >
                                            {index + 1}) {questionMap[questionSubmission.questionId].question.question}
                                        </Text>
                                        <Text>
                                            Answer: {
                                            questionSubmission.questionType === QuestionTypes.MultipleChoice ? (
                                                `${questionSubmission.answer}) ${questionMap[questionSubmission.questionId].question.options[questionSubmission.answer]}`
                                            ) : (
                                                questionSubmission.answer
                                            )
                                        }
                                        </Text>
                                        {
                                            questionSubmission.points !== null && questionSubmission.gradeExplanation !== null && (
                                                <VStack
                                                    w={'100%'}
                                                    align={'flex-start'}
                                                >
                                                    <Text
                                                        fontWeight={'bold'}
                                                        color={questionSubmission.points > 0 ? 'brand.500' : 'red.500'}
                                                        fontSize={'sm'}
                                                    >
                                                        {questionSubmission.points > 0 ? 'Correct!' : 'Incorrect'}
                                                    </Text>
                                                    <Text>
                                                        Explanation: {questionSubmission.gradeExplanation}
                                                    </Text>
                                                </VStack>
                                            )
                                        }
                                    </VStack>
                                ))
                            }
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    );
};

export default StudentSubmission;
