import React from 'react';
import {User} from "@/types/User";
import {Assignment} from "@/types/assignment/Assignment";
import useUserAssignmentSummary from "@/hooks/queries/summaries/useUserAssignmentSummary";
import {Skeleton, Text, VStack} from "@chakra-ui/react";

interface Props {
    userId: User['id'],
    assignmentId: Assignment['id']
}

const SubmissionSummary: React.FC<Props> = ({ userId, assignmentId}) => {

    const { summary, loading } = useUserAssignmentSummary(userId, assignmentId)

    if(loading) {
        return (
            <Skeleton
                h={20}
            />
        )
    }

    if(!summary) {
        return (
            <Text>
                No summary found
            </Text>
        )
    }

    return (
        <VStack
            w={'100%'}
            align={'flex-start'}
        >
            <Text
                fontSize={'sm'}
                fontWeight={'bold'}
            >
                Summary
            </Text>
            <Text>
                {summary.summary}
            </Text>
        </VStack>
    );
};

export default SubmissionSummary;
