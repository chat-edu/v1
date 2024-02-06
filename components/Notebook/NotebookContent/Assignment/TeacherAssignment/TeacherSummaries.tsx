import React from 'react';

import {
    HStack, Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure, VStack
} from "@chakra-ui/react";

import {TbReportAnalytics} from "react-icons/tb";

import Submissions from "@/components/Notebook/NotebookContent/Assignment/Submissions/Submissions";
import ClickableCard from "@/components/Utilities/ClickableCard";
import AssignmentSummary from "@/components/Notebook/NotebookContent/Assignment/TeacherAssignment/AssignmentSummary";

import useSubmissions from "@/hooks/queries/submissions/useSubmissions";

import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {QuestionMap} from "@/types/assignment/Question";

interface Props {
    assignmentWithQuestions: AssignmentWithQuestions;
    questionMap: QuestionMap;
}

const TeacherSummaries: React.FC<Props> = ({ assignmentWithQuestions, questionMap }) => {

    const { userSubmissions } = useSubmissions(assignmentWithQuestions.id);

    // calculate the average score of all submissions:

    const averageScorePercentage = userSubmissions.reduce((acc, userSubmission) => {
        return acc + userSubmission.submissions.reduce((acc, submission) => {
            return acc + (submission.points !== null ? submission.points : 0);
        }, 0) / userSubmission.submissions.length;
    }, 0) / userSubmissions.length;

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
                    <ModalHeader />
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        flexDirection={'column'}
                        gap={8}
                    >
                        <Submissions
                            assignmentWithQuestions={assignmentWithQuestions}
                            questionMap={questionMap}
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
                    w={'100%'}
                >
                    <Icon
                        as={TbReportAnalytics}
                        boxSize={'36px'}
                        color={'brand.500'}
                    />
                    <VStack
                        align={'start'}
                        spacing={0}
                        flex={1}
                    >
                        <Text
                            fontSize={'xl'}
                            fontWeight={'bold'}
                            lineHeight={1}
                        >
                            View Class Performance
                        </Text>
                        <Text
                            mb={4}
                        >
                            Click here to view all of your students&apos; submissions and their scores.
                        </Text>
                    </VStack>
                    {
                        userSubmissions.length > 0 && (
                            <Text
                                fontSize={'xl'}
                                fontWeight={'bold'}
                                ml={'auto'}
                            >
                                {(averageScorePercentage * 100).toFixed(2)}%
                            </Text>
                        )
                    }
                </HStack>
                <AssignmentSummary
                    assignmentId={assignmentWithQuestions.id}
                />
            </ClickableCard>
        </>
    );
};

export default TeacherSummaries;
