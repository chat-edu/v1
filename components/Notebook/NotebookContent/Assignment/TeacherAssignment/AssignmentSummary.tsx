import React, {useState} from 'react';

import {Button, HStack, Icon, Skeleton, Text, useToast, VStack} from "@chakra-ui/react";
import {FaWandMagicSparkles} from "react-icons/fa6";

import TooltipIconButton from "@/components/Utilities/TooltipIconButton";

import useAssignmentSummary from "@/hooks/queries/summaries/useAssignmentSummary";

import {generateAssignmentSummary, regenerateAssignmentSummary} from "@/services/summaries";

import {Assignment} from "@/types/assignment/Assignment";
import Markdown from "@/components/Utilities/Markdown";

interface Props {
    assignmentId: Assignment['id'];
}

const AssignmentSummary: React.FC<Props> = ({ assignmentId }) => {

    const toast = useToast();

    const { assignmentSummary, loading, fetchData } = useAssignmentSummary(assignmentId);

    const [isRegenerating, setIsRegenerating] = useState(false);


    if(loading) {
        return (
            <Skeleton />
        )
    }

    const generateSummary = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsRegenerating(true);
        const summary = await generateAssignmentSummary(assignmentId);
        if(summary) {
            toast({
                title: 'Summary Generated',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
            fetchData();
        } else {
            toast({
                title: 'Failed to generate summary',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
        setIsRegenerating(false);
    }

    const regenerateSummary = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsRegenerating(true);
        const summary = await regenerateAssignmentSummary(assignmentId);
        if(summary) {
            toast({
                title: 'Summary regenerated',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
            fetchData();
        } else {
            toast({
                title: 'Failed to regenerate summary',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
        setIsRegenerating(false);
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
                spacing={0}
            >
                {
                    assignmentSummary ? (
                        <>
                            <Text
                                fontSize={'sm'}
                                fontWeight={'bold'}
                            >
                                Performance Summary
                            </Text>
                            <Markdown>
                                {assignmentSummary.summary}
                            </Markdown>
                        </>
                    ) : (
                        <Button
                            onClick={generateSummary}
                            flexShrink={0}
                            isLoading={isRegenerating}
                            colorScheme={'brand'}
                        >
                            Generate Assignment Summary
                        </Button>
                    )
                }
            </VStack>
            {
                assignmentSummary && (
                    <TooltipIconButton
                        aria-label={'Regenerate Assignment Summary'}
                        icon={
                            <Icon
                                as={FaWandMagicSparkles}
                                boxSize={'36px'}
                                color={'brand.500'}
                            />
                        }
                        onClick={regenerateSummary}
                        variant={'ghost'}
                        isLoading={isRegenerating}
                    />
                )
            }
        </HStack>
    );
};

export default AssignmentSummary;
