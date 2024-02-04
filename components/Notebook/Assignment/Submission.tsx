import React, {useMemo} from 'react';

import {Divider, Flex, Text, VStack} from "@chakra-ui/react";

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

    return (
        <Flex
            w={'100%'}
            direction={'column'}
            align={'flex-start'}
            borderWidth={2}
            rounded={'md'}
            p={4}
            gap={4}
        >
            <Text
                fontSize={'xl'}
                fontWeight={'bold'}
            >
                {userData?.name}
            </Text>
            <VStack>
                {
                    sortedSubmissions.map((submission) => (
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
                                {questionMap[submission.questionId].question.question}
                            </Text>
                            <Text>
                                {
                                    submission.questionType === QuestionTypes.MultipleChoice ? (
                                        `${submission.answer}) ${questionMap[submission.questionId].question.options[submission.answer]}`
                                    ) : (
                                        submission.answer
                                    )
                                }
                            </Text>
                        </VStack>
                    ))
                }
            </VStack>
        </Flex>
    );
};

export default Submission;
