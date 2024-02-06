import React, {useMemo} from 'react';

import {Card, HStack, Icon, Skeleton, Text, VStack} from "@chakra-ui/react";

import {FaChalkboardTeacher} from "react-icons/fa";
import {Notebook} from "@/types/Notebook";
import NotebookSummary from "@/components/Notebook/TeacherOverview/NotebookOverview/NotebookSummary";
import useNotebookSubmissions from "@/hooks/queries/submissions/useNotebookSubmissions";
import BarChart from "@/components/Utilities/BarChart";
import {calculateGrade, grades} from "@/lib/grades";

interface Props {
    notebookId: Notebook["id"]
}


const NotebookOverview: React.FC<Props> = ({ notebookId }) => {

    const { userSubmissionsMap, loading } = useNotebookSubmissions(notebookId);

    const gradesData = useMemo(() => {
        const gradesData: {grade: string, "Students": number}[] = [];
        if(!userSubmissionsMap) return gradesData;
        // for each grade, calculate the number of students who received that grade
        grades.forEach(grade => {
            let count = 0;
            for (const [userId, submissions] of userSubmissionsMap) {
                const userGrade = calculateGrade(submissions.reduce((acc, submission) => {
                    return acc + submission.submissions.reduce((acc, submission) => {
                        return acc + (submission.points !== null ? submission.points : 0);
                    }, 0);
                }, 0), submissions.reduce((acc, submission) => {
                    return acc + submission.submissions.length;
                }, 0));
                if(userGrade === grade.grade) count++;
            }
            gradesData.push({
                grade: grade.grade,
                "Students": count
            });
        });
        return gradesData;
    }, [userSubmissionsMap])

    return (
        <Card
            variant={'outline'}
            w={'100%'}
            gap={4}
        >
            <HStack
                spacing={4}
                w={'100%'}
            >
                <Icon
                    as={FaChalkboardTeacher}
                    boxSize={'36px'}
                    color={'brand.500'}
                />
                <VStack
                    align={'flex-start'}
                >
                    <Text
                        fontSize={'xl'}
                        fontWeight={'bold'}
                        lineHeight={1}
                    >
                        Classroom Overview
                    </Text>
                    <Text>
                        Get a holistic view of your classroom&apos;s strengths and knowledge gaps.
                    </Text>
                </VStack>
            </HStack>
            <NotebookSummary
                notebookId={notebookId}
            />
            {
                loading ? (
                    <Skeleton
                        w={'100%'}
                        h={'150px'}
                    />
                ) : (
                    <BarChart
                        height={150}
                        width={'100%'}
                        data={gradesData}
                        labelKey={'grade'}
                        valueKey={'Students'}
                    />
                )
            }
        </Card>
    );
};

export default NotebookOverview;
