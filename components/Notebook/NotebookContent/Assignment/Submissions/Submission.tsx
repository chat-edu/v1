import React, {useMemo} from 'react';

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem, AccordionPanel,
    Divider,
    Flex,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";

import SubmissionSummary from "@/components/Notebook/NotebookContent/Assignment/Submissions/SubmissionSummary";

import useUser from "@/hooks/queries/user/useUser";

import {UserSubmission} from "@/types/Submission";
import {QuestionMap, QuestionTypes} from "@/types/assignment/Question";

interface Props {
    userSubmission: UserSubmission,
    questionMap: QuestionMap
}

const Submission: React.FC<Props> = ({ userSubmission, questionMap }) => {

    const { userData } = useUser(userSubmission.userId);

    const sortedSubmissions = useMemo(() => {
        return userSubmission.submissions.sort((a, b) => {
            return questionMap[a.questionId].question.questionNumber - questionMap[b.questionId].question.questionNumber;
        });
    }, [userSubmission.submissions, questionMap]);

    const scorePercentage = userSubmission.submissions.reduce((acc, submission) => acc + (submission.points ? submission.points : 0), 0) / userSubmission.submissions.length;

    const accentColor = scorePercentage > 0.8 ? 'green.500' : scorePercentage > 0.6 ? 'yellow.500' : 'red.500';

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
                    {userData?.name}
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
                userId={userSubmission.userId}
                assignmentId={userSubmission.assignmentId}
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
                                sortedSubmissions.map((submission, index) => (
                                    <VStack
                                        key={`${submission.questionType}-${submission.id}`}
                                        w={'100%'}
                                        align={'flex-start'}
                                    >
                                        <Divider />
                                        <Text
                                            fontWeight={'semibold'}
                                            fontStyle={'italic'}
                                        >
                                            {index + 1}) {questionMap[submission.questionId].question.question}
                                        </Text>
                                        <Text>
                                            Answer: {
                                            submission.questionType === QuestionTypes.MultipleChoice ? (
                                                `${submission.answer}) ${questionMap[submission.questionId].question.options[submission.answer]}`
                                            ) : (
                                                submission.answer
                                            )
                                        }
                                        </Text>
                                        {
                                            submission.points !== null && submission.gradeExplanation !== null && (
                                                <VStack
                                                    w={'100%'}
                                                    align={'flex-start'}
                                                >
                                                    <Text
                                                        fontWeight={'bold'}
                                                        color={submission.points > 0 ? 'brand.500' : 'red.500'}
                                                        fontSize={'sm'}
                                                    >
                                                        {submission.points > 0 ? 'Correct!' : 'Incorrect'}
                                                    </Text>
                                                    <Text>
                                                        Explanation: {submission.gradeExplanation}
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

export default Submission;
