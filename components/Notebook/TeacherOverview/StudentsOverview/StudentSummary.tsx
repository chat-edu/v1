import React, {useState} from 'react';

import {Button, HStack, Icon, Skeleton, Text, useToast, VStack} from "@chakra-ui/react";

import useUserNotebookSummary from "@/hooks/queries/summaries/useUserNotebookSummary";

import {
    generateUserNotebookSummary,
    regenerateUserNotebookSummary
} from "@/services/summaries";

import {Notebook} from "@/types/Notebook";
import {User} from "@/types/User";
import {IoMdRefreshCircle} from "react-icons/io";
import TooltipIconButton from "@/components/Utilities/TooltipIconButton";


interface Props {
    userId: User["id"];
    notebookId: Notebook["id"];
}

const StudentSummary: React.FC<Props> = ({ userId, notebookId }) => {
    const toast = useToast();

    const [isRegenerating, setIsRegenerating] = useState(false);

    const { userNotebookSummary, loading, fetchData } = useUserNotebookSummary(userId, notebookId);

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
        const summary = await generateUserNotebookSummary(userId, notebookId);
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
        const summary = await regenerateUserNotebookSummary(userId, notebookId);
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
            >
                {
                    userNotebookSummary ? (
                        <Text
                            flex={1}
                        >
                            {userNotebookSummary.summary}
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
                userNotebookSummary && (
                    <TooltipIconButton
                        aria-label={'Regenerate Summary'}
                        icon={
                            <Icon
                                as={IoMdRefreshCircle}
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

export default StudentSummary;
