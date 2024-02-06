import React from 'react';

import {
    Avatar,
    HStack,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Skeleton,
    Text,
    useDisclosure, VStack,
} from "@chakra-ui/react";

import StudentSummary from "@/components/Notebook/TeacherOverview/StudentsOverview/StudentSummary";
import StudentSubmissions from "@/components/Notebook/TeacherOverview/StudentsOverview/StudentSubmissions";

import useUser from "@/hooks/queries/user/useUser";

import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";
import ClickableCard from "@/components/Utilities/ClickableCard";

interface Props {
    userId: User["id"],
    notebookId: Notebook["id"]
}

const StudentOverview: React.FC<Props> = ({ userId, notebookId }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { userData, loading } = useUser(userId);

    if(loading) {
        return (
            <Skeleton
                w={'100%'}
                h={20}
            />
        )
    }

    if(!userData) {
        return null;
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior={'inside'}
                size={'2xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack
                            spacing={4}
                        >
                            <Avatar
                                src={userData.profilePictureUrl || ''}
                                boxSize={'40px'}
                            />
                            <Text
                                fontWeight={'black'}
                                fontSize={'2xl'}
                            >
                                {userData.name}
                            </Text>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack
                            spacing={4}
                            alignItems={'flex-start'}
                        >
                            <VStack
                                alignItems={'flex-start'}
                                w={'100%'}
                            >
                                <Text
                                    fontSize={'xl'}
                                    fontWeight={'bold'}
                                >
                                    Summary
                                </Text>
                                <StudentSummary
                                    userId={userId}
                                    notebookId={notebookId}
                                />
                            </VStack>
                            <StudentSubmissions
                                userId={userId}
                                notebookId={notebookId}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
            <ClickableCard
                variant={'outline'}
                w={'100%'}
                gap={4}
                alignItems={'flex-start'}
                onClick={onOpen}
            >
                <HStack
                    w={'100%'}
                    spacing={4}
                >
                    <Avatar
                        src={userData.profilePictureUrl || ''}
                        boxSize={'40px'}
                    />
                    <Text
                        fontWeight={'bold'}
                        fontSize={'lg'}
                    >
                        {userData.name}
                    </Text>
                </HStack>
                <StudentSummary
                    userId={userId}
                    notebookId={notebookId}
                />
            </ClickableCard>
        </>
    );
};

export default StudentOverview;
