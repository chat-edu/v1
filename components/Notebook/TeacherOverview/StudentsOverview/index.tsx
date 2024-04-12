import React from 'react';

import {Card, HStack, Icon, Skeleton, Text, VStack, Button} from "@chakra-ui/react";

import {PiStudentBold} from "react-icons/pi";

import StudentOverview from "@/components/Notebook/TeacherOverview/StudentsOverview/StudentOverview";
import StudentSummary from '@/components/Notebook/TeacherOverview/StudentsOverview/StudentSummary';

import useEnrollments from "@/hooks/queries/enrollments/useEnrollments";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebookId: Notebook["id"]
}


const StudentsOverview: React.FC<Props> = ({ notebookId }) => {

    const { enrollments, loading } = useEnrollments(notebookId);

    const handleDownload = () => {
        const csvData = convertToCSV(enrollments);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'students_overview.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <Card
            variant={'outline'}
            w={'100%'}
            gap={4}
        >
            <HStack
                justifyContent={'space-between'}
                w={'100%'}
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
                <Button
                    onClick={handleDownload}
                    colorScheme="brand"
                    variant={'outline'}
                    size={'sm'}
                >
                    Download as CSV
                </Button>
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

//TODO - Making this work with student summary data may require using a SummaryContext.tsx
function convertToCSV(enrollments: any[]) {
    const headers = "User ID, Notebook ID, Student Summary";
    const rows = enrollments.map(enrollment => {
        // Check if summary exists and is a string before attempting to replace characters
        const summary = enrollment.summary && typeof enrollment.summary === 'string'
            ? enrollment.summary.replace(/"/g, '""') // Escape double quotes
            : ""; // Provide an empty string if summary is not available
        return `"${enrollment.userId}", "${enrollment.notebookId}", "${StudentSummary}"`;
    }).join("\r\n");

    return `${headers}\r\n${rows}`;
}






export default StudentsOverview;
