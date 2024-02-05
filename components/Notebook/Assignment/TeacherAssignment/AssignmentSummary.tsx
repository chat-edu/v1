import React from 'react';

import {Button, HStack, Skeleton, Text, useToast, VStack} from "@chakra-ui/react";

import useAssignmentSummary from "@/hooks/queries/summaries/useAssignmentSummary";

import {generateAssignmentSummary, regenerateAssignmentSummary} from "@/services/summaries";

import {Assignment} from "@/types/assignment/Assignment";

interface Props {
    assignmentId: Assignment['id'];
}

const AssignmentSummary: React.FC<Props> = ({ assignmentId }) => {

    const toast = useToast();

    const { assignmentSummary, loading } = useAssignmentSummary(assignmentId);


    if(loading) {
        return (
            <Skeleton />
        )
    }

    const generateSummary = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const summary = await generateAssignmentSummary(assignmentId);
        if(summary) {
            toast({
                title: 'Summary Generated',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } else {
            toast({
                title: 'Failed to generate summary',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    const regenerateSummary = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const summary = await regenerateAssignmentSummary(assignmentId);
        if(summary) {
            toast({
                title: 'Summary regenerated',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } else {
            toast({
                title: 'Failed to regenerate summary',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    return (
        <HStack
            w={'100%'}
            justifyContent={'space-between'}
            spacing={4}
        >
            <VStack
                w={'100%'}
                align={'flex-start'}
            >
                <Text
                    fontSize={'sm'}
                    fontWeight={'bold'}
                >
                    Performance Summary
                </Text>
                {
                    assignmentSummary ? (
                        <Text>
                            {assignmentSummary.summary}
                        </Text>
                    ) : (
                        <Button
                            onClick={generateSummary}
                            flexShrink={0}
                        >
                            Generate Summary
                        </Button>
                    )
                }
            </VStack>
            {
                assignmentSummary && (
                    <Button
                        flexShrink={0}
                        onClick={regenerateSummary}
                    >
                        Regenerate Summary
                    </Button>
                )
            }
        </HStack>
    );
};

export default AssignmentSummary;
