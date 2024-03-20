import React, {useState} from 'react';

import {
    Button,
    HStack,
    Icon,
    Skeleton,
    useToast,
    VStack
} from "@chakra-ui/react";
import {FaWandMagicSparkles} from "react-icons/fa6";

import Markdown from "@/components/Utilities/Markdown";
import TooltipIconButton from "@/components/Utilities/TooltipIconButton";

import useUserNotebookSummary from "@/hooks/queries/summaries/useUserNotebookSummary";

import {
    generateUserNotebookSummary,
    regenerateUserNotebookSummary
} from "@/services/summaries";

import {Notebook} from "@/types/Notebook";
import {User} from "@/types/User";
import {useModel} from "@/contexts/ModelContext";


interface Props {
    userId: User["id"];
    notebookId: Notebook["id"];
}

const StudentSummary: React.FC<Props> = ({ userId, notebookId }) => {

    const { model } = useModel();

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
        const summary = await generateUserNotebookSummary(userId, notebookId, model);
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
        const summary = await regenerateUserNotebookSummary(userId, notebookId, model);
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
                        <Markdown>
                            {userNotebookSummary.summary}
                        </Markdown>
                    ) : (
                        <Button
                            onClick={generateSummary}
                            flexShrink={0}
                            isLoading={isRegenerating}
                            colorScheme={'brand'}
                        >
                            Generate Student Summary
                        </Button>
                    )
                }
            </VStack>
            {
                userNotebookSummary && (
                    <TooltipIconButton
                        aria-label={'Regenerate Student Summary'}
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

export default StudentSummary;
