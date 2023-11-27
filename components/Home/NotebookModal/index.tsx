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

import NotebookTags from "@/components/NotebookUtilities/NotebookTags";
import NotebookLeaderboard from "@/components/NotebookUtilities/NotebookLeaderboard";
import NotesDisplay from "@/components/Home/NotebookModal/NotesDisplay";
import UsernameText from "@/components/Utilities/UsernameText";

import useNotebookRank from "@/hooks/queries/notebook/useNotebookRank";

import {Notebook} from "@/types/Notebook";
import useAuth from "@/hooks/useAuth";
import DeleteNotebookButton from "@/components/Home/NotebookModal/DeleteNotebookButton";


interface Props {
    notebook: Notebook,
    isOpen: boolean,
    onClose: () => void
}

const NotebookModal: React.FC<Props> = ({ notebook, isOpen, onClose }) => {

    const { user } = useAuth();

    const { notebookRank, loading } = useNotebookRank(notebook.id);

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
                    pt={8}
                >
                    <HStack
                        justify={'space-between'}
                        w={'100%'}
                    >
                        <VStack
                            align={'start'}
                        >
                            <NotebookTags
                                notebookId={notebook.id}
                            />
                            <Heading
                                size={{
                                    base: 'md',
                                    md: 'lg'
                                }}
                            >
                                {notebook.name}
                            </Heading>
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
                                    username={notebook.username}
                                    id={notebook.userId}
                                    verified={notebook.verified}
                                    opacity={0.75}
                                />
                            </HStack>
                        </VStack>
                        {
                            (!loading && notebookRank) && (
                                <VStack
                                    align={'end'}
                                >
                                    <Text
                                        fontSize={'md'}
                                        color={'brand.500'}
                                    >
                                        Rank: #{notebookRank.rank}
                                    </Text>
                                    <Text
                                        fontSize={'md'}

                                    >
                                        Total Score: {notebookRank.totalScore}
                                    </Text>
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
                            notebook={notebook}
                            allowAddNote={user && user.id === notebook.userId}
                        />
                        <NotebookLeaderboard
                            notebookId={notebook.id}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter
                    flexDirection={'column'}
                    gap={2}
                >
                    <Link
                        href={`/notebooks/${notebook.id}`}
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
                        user && user.id === notebook.userId && (
                            <DeleteNotebookButton
                                notebook={notebook}
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
