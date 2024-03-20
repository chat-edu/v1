import React, {useState} from 'react';

import {Button, HStack, Icon, Skeleton, Text, useToast, VStack} from "@chakra-ui/react";
import {FaWandMagicSparkles} from "react-icons/fa6";

import useNotebookSummary from "@/hooks/queries/summaries/useNotebookSummary";

import {
    generateNotebookSummary,
    regenerateNotebookSummary
} from "@/services/summaries";

import {Notebook} from "@/types/Notebook";
import TooltipIconButton from "@/components/Utilities/TooltipIconButton";
import Markdown from "@/components/Utilities/Markdown";
import {useModel} from "@/contexts/ModelContext";

interface Props {
    notebookId: Notebook['id']
}

const NotebookSummary: React.FC<Props> = ({ notebookId }) => {

    const { model } = useModel();

    const toast = useToast();

    const [isRegenerating, setIsRegenerating] = useState(false);

    const { notebookSummary, loading, fetchData } = useNotebookSummary(notebookId);

    if(loading) {
        return (
            <Skeleton
                w={'100%'}
                h={20}
            />
        )
    }

    const generateSummary = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsRegenerating(true)
        const summary = await generateNotebookSummary(notebookId, model);
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
        const summary = await regenerateNotebookSummary(notebookId, model);
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
                flex={1}
                spacing={0}
            >
                {
                    notebookSummary ? (
                        <>
                            <Text
                                fontSize={'sm'}
                                fontWeight={'bold'}
                            >
                                Class Summary
                            </Text>
                            <Markdown>
                                {notebookSummary.summary}
                            </Markdown>
                        </>

                    ) : (
                        <Button
                            onClick={generateSummary}
                            flexShrink={0}
                            isLoading={isRegenerating}
                            colorScheme={'brand'}
                        >
                            Generate Classroom Summary
                        </Button>
                    )
                }
            </VStack>
            {
                notebookSummary && (
                    <TooltipIconButton
                        aria-label={'Regenerate Notebook Summary'}
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

export default NotebookSummary;
