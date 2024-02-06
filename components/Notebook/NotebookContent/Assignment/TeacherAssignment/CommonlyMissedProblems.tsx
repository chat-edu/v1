import React, {useMemo} from 'react';

import {Card, HStack, Icon, SimpleGrid, Skeleton, Text, VStack} from "@chakra-ui/react";
import {IoMdClose} from "react-icons/io";

import useSubmissions from "@/hooks/queries/submissions/useSubmissions";

import {AssignmentWithQuestions} from "@/types/assignment/Assignment";

interface Props {
    assignmentWithQuestions: AssignmentWithQuestions;
}

const CommonlyMissedProblems: React.FC<Props> = ({ assignmentWithQuestions }) => {

    const { userSubmissions, loading } = useSubmissions(assignmentWithQuestions.id);

    const commonlyMissedProblemIds = useMemo(() => {
        const problemCount: Record<string, number> = {};
        userSubmissions.forEach(userSubmission => {
            userSubmission.submissions.forEach(submission => {
                if (submission.points === 0) {
                    if (problemCount[submission.questionId]) {
                        problemCount[submission.questionId]++;
                    } else {
                        problemCount[submission.questionId] = 1;
                    }
                }
            });
        });
        // return the top 3 most commonly missed problems:
        const quesionIds = Object.keys(problemCount)
            .sort((a, b) => problemCount[b] - problemCount[a])
            .slice(0, 3);
        return quesionIds.map(id => ({
            id,
            count: problemCount[id]
        }));
    }, [userSubmissions]);

    return (
        <Card
            variant={'outline'}
            shadow={'none'}
            w={'100%'}
        >
            <HStack
                spacing={4}
                alignItems={'start'}
            >
                <Icon
                    as={IoMdClose}
                    boxSize={'36px'}
                    color={'brand.500'}
                />
                <VStack
                    align={'start'}
                    spacing={0}
                >
                    <Text
                        fontSize={'xl'}
                        fontWeight={'bold'}
                        lineHeight={1}
                    >
                        Common Mistakes
                    </Text>
                    <Text>
                        Your students are struggling with the following problems.
                    </Text>
                </VStack>
            </HStack>
            <VStack
                w={'100%'}
                mt={4}
                spacing={4}
                alignItems={'start'}
            >
                {
                    loading ? (
                        <Skeleton
                            w={'100%'}
                            h={20}
                        />
                    ) : (
                        commonlyMissedProblemIds.length > 0 ? (
                            commonlyMissedProblemIds.map((questionWithCount, index) => (
                                <HStack
                                    key={questionWithCount.id}
                                    w={'100%'}
                                    justify={'space-between'}
                                    align={'start'}
                                    spacing={8}
                                >
                                    <Text
                                        fontSize={'sm'}
                                    >
                                        {index + 1}) {assignmentWithQuestions.questions.find(question => question.question.id === parseInt(questionWithCount.id))?.question.question}
                                    </Text>
                                    <Text
                                        fontSize={'sm'}
                                        textAlign={'right'}
                                        flexShrink={0}
                                    >
                                        {questionWithCount.count} student{questionWithCount.count > 1 ? 's' : ''} missed
                                    </Text>
                                </HStack>
                            ))
                        ) : (
                            <Text>
                                No problems have been missed by your students.
                            </Text>
                        )
                    )
                }
            </VStack>
        </Card>
    );
};

export default CommonlyMissedProblems;
