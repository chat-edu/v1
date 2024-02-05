import React from 'react';
import {Notebook} from "@/types/Notebook";
import useEnrollments from "@/hooks/queries/enrollments/useEnrollments";
import {Card, HStack, Icon, Skeleton, Text, VStack} from "@chakra-ui/react";
import StudentOverview from "@/components/Notebook/TeacherOverview/StudentsOverview/StudentOverview";
import {PiStudentBold} from "react-icons/pi";

interface Props {
    notebookId: Notebook["id"]
}

const StudentsOverview: React.FC<Props> = ({ notebookId }) => {

    const { enrollments, loading } = useEnrollments(notebookId);

    return (
        <Card
            variant={'outline'}
            w={'100%'}
            gap={4}
        >
            <HStack>
                <Icon
                    boxSize={'36px'}
                    color={'brand.500'}
                    as={PiStudentBold}
                />
                <VStack
                    align={'flex-start'}
                >
                    <Text
                        fontSize={'xl'}
                        fontWeight={'bold'}
                        lineHeight={1}
                    >
                        Students Overview
                    </Text>
                    <Text>
                        View and manage your students&apos; progress and submissions.
                    </Text>
                </VStack>
            </HStack>
            {
                loading ? (
                    <Skeleton
                        w={'100%'}
                        h={20}
                    />
                ) : (
                    <VStack
                        w={'100%'}
                        spacing={4}
                        alignItems={'flex-start'}
                    >
                        {
                            enrollments.map(enrollment => (
                                <StudentOverview
                                    key={enrollment.userId}
                                    userId={enrollment.userId}
                                    notebookId={enrollment.notebookId}
                                />
                            ))
                        }
                    </VStack>
                )
            }
        </Card>
    );
};

export default StudentsOverview;
