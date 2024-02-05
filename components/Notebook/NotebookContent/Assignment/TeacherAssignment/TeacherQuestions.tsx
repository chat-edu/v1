import React from 'react';

import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {
    HStack, Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, SimpleGrid, Text,
    useDisclosure, VStack
} from "@chakra-ui/react";
import Questions from "@/components/Notebook/NotebookContent/Assignment/Questions/Questions";
import ClickableCard from "@/components/Utilities/ClickableCard";
import GenerateQuestions from "@/components/Notebook/NotebookContent/Assignment/Questions/GenerateQuestions";
import {FaClipboardQuestion} from "react-icons/fa6";

interface Props {
    assignment: AssignmentWithQuestions
}

const TeacherQuestions: React.FC<Props> = ({ assignment }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <ModalHeader>{assignment.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        flexDirection={'column'}
                        gap={8}
                    >
                        <Questions
                            assignmentWithQuestions={assignment}
                        />
                        <GenerateQuestions
                            assignmentWithQuestions={assignment}
                        />
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
            <ClickableCard
                onClick={onOpen}
                variant={'outline'}
                w={'100%'}
            >
                <HStack
                    spacing={4}
                    alignItems={'start'}
                >
                    <Icon
                        as={FaClipboardQuestion}
                        boxSize={'36px'}
                        color={'brand.500'}
                    />
                    <VStack
                        align={'start'}
                        spacing={0}
                    >
                        <Text
                            fontSize={'xl'}
                            fontWeight={'bold'}
                            lineHeight={1}
                        >
                            View and Edit Questions
                        </Text>
                        <Text>
                            Click to view and edit the questions for this assignment.
                        </Text>
                        <SimpleGrid
                            columns={2}
                            spacing={4}
                            w={'100%'}
                            mt={4}
                        >
                            {
                                assignment.questions.map((question, index) => (
                                    <Text
                                        key={question.question.id}
                                        fontSize={'sm'}
                                    >
                                        {index + 1}) {question.question.question}
                                    </Text>
                                ))
                            }
                        </SimpleGrid>
                    </VStack>
                </HStack>
            </ClickableCard>
        </>
    );
};

export default TeacherQuestions;
