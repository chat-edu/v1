import React from 'react';

import {
    Button,
    Flex,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack
} from "@chakra-ui/react";

import Link from "next/link";

import NotebookLeaderboard from "@/components/NotebookUtilities/NotebookLeaderboard";
import NotesDisplay from "@/components/Home/NotebookModal/NotesDisplay";
import UsernameText from "@/components/Utilities/UsernameText";
import DeleteNotebookButton from "@/components/Home/NotebookModal/DeleteNotebookButton";
import NotebookPoints from "@/components/Utilities/Points/NotebookPoints";

import useNotebookRank from "@/hooks/queries/scores/notebooks/useNotebookRank";
import useAuth from "@/hooks/useAuth";

import {NotebookScore} from "@/types/score";


interface Props {
    notebook: NotebookScore,
    isOpen: boolean,
    onClose: () => void
}

const NotebookModal: React.FC<Props> = ({ notebook, isOpen, onClose }) => {

    const { user } = useAuth();

    const { notebookRank, loading } = useNotebookRank(notebook.notebookId);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
            scrollBehavior={'inside'}
            isCentered={true}
            autoFocus={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    pt={12}
                >
                    <HStack
                        justify={'space-between'}
                        w={'100%'}
                    >
                        <VStack
                            align={'start'}
                        >
                            <HStack>
                                <Heading
                                    size={{
                                        base: 'md',
                                        md: 'lg'
                                    }}
                                >
                                    {notebook.notebookName}
                                </Heading>
                            </HStack>
                            <HStack
                                spacing={0}
                                align={'center'}
                            >
                                <Text
                                    fontSize={'sm'}
                                    opacity={0.75}
                                >
                                    By
                                </Text>
                                <UsernameText
                                    username={notebook.authorUsername}
                                    id={notebook.authorId}
                                    verified={notebook.authorVerified}
                                    opacity={0.75}
                                />
                            </HStack>
                        </VStack>
                        {
                            (!loading && notebookRank) && (
                                <VStack
                                    align={'end'}
                                    spacing={0}
                                >
                                    <Text
                                        fontSize={'md'}
                                        color={'brand.500'}
                                    >
                                        Rank: #{notebookRank.rank}
                                    </Text>
                                    <NotebookPoints
                                        points={notebookRank.score}
                                    />
                                </VStack>
                            )
                        }
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        direction={'column'}
                        gap={4}
                    >
                        <NotesDisplay
                            notebookId={notebook.notebookId}
                            allowAddNote={user && user.id === notebook.authorId}
                        />
                        <NotebookLeaderboard
                            notebookId={notebook.notebookId}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter
                    flexDirection={'column'}
                    gap={2}
                >
                    <Link
                        href={`/notebooks/${notebook.notebookId}`}
                        style={{
                            width: '100%'
                        }}
                    >
                        <Button
                            colorScheme={'brand'}
                            w={'100%'}
                        >
                            Start Studying
                        </Button>
                    </Link>
                    {
                        user && user.id === notebook.authorId && (
                            <DeleteNotebookButton
                                notebookId={notebook.notebookId}
                                notebookName={notebook.notebookName}
                                onDelete={onClose}
                            />
                        )
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NotebookModal;
