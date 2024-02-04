import React from 'react';

import {Card, Text, Skeleton, VStack, Box} from "@chakra-ui/react";

import AssignmentHeader from "@/components/Notebook/Assignment/AssignmentHeader";
import Questions from "@/components/Notebook/Assignment/Questions";
import GenerateQuestions from "@/components/Notebook/Assignment/GenerateQuestions";

import useAssignment from "@/hooks/queries/assignment/useAssignment";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/user/useUser";

import { Assignment as AssignmentType } from "@/types/assignment/Assignment";
import Submissions from "@/components/Notebook/Assignment/Submissions";

interface Props {
    assignment: AssignmentType,
}

const Assignment: React.FC<Props> = ({ assignment }) => {

    const { user } = useAuth();
    const { isTeacher } = useUser(user?.id || '');

    const { assignmentWithQuestions, loading } = useAssignment(assignment.id);

    return (
        <Box
            p={4}
            w={'100%'}
        >
            <Card
                w={'100%'}
                gap={4}
            >
                {
                    loading && !assignmentWithQuestions ? (
                        <Skeleton />
                    ) : (
                        assignmentWithQuestions ? (
                            <>
                                <AssignmentHeader
                                    assignment={assignmentWithQuestions}
                                    isTeacher={isTeacher}
                                />
                                <VStack
                                    w={'100%'}
                                    spacing={8}
                                >
                                    <Questions
                                        assignmentWithQuestions={assignmentWithQuestions}
                                    />
                                    {
                                        isTeacher && (
                                            <GenerateQuestions
                                                assignmentWithQuestions={assignmentWithQuestions}
                                            />
                                        )
                                    }
                                </VStack>
                                <Submissions
                                    assignmentWithQuestions={assignmentWithQuestions}
                                />
                            </>
                        ) : (
                            <Text>
                                No Assignment Found
                            </Text>
                        )
                    )
                }
            </Card>
        </Box>
    );
};

export default Assignment;
