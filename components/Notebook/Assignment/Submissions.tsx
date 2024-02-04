import React from 'react';
import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import useSubmissions from "@/hooks/queries/submissions/useSubmissions";
import {Heading, HStack, Text, VStack} from "@chakra-ui/react";

interface Props {
    assignmentWithQuestions: AssignmentWithQuestions;
}

const Submissions: React.FC<Props> = ({ assignmentWithQuestions}) => {

    const { userSubmissions } = useSubmissions(assignmentWithQuestions.id);

    return (
        <VStack>
            <Heading>
                Submissions
            </Heading>
            {userSubmissions.map(userSubmission => (
                <VStack key={`${userSubmission.userId}-${userSubmission.assignmentId}`}>
                    <Text>
                        {userSubmission.userId} - {userSubmission.assignmentId}
                    </Text>
                    {userSubmission.submissions.map(submission => (
                        <HStack key={submission.id}>
                            <Text>
                                {submission.id}
                            </Text>
                            <Text>
                                {submission.questionId}
                            </Text>
                            <Text>
                                {submission.answer}
                            </Text>
                        </HStack>
                    ))}
                </VStack>
            ))}
        </VStack>
    );
};

export default Submissions;
