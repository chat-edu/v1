import React from 'react';

import {
    Text,
    VStack
} from "@chakra-ui/react";

import StudentSubmission from "@/components/Notebook/TeacherOverview/StudentsOverview/StudentSubmission";

import useUserSubmissions from "@/hooks/queries/submissions/useUserSubmissions";

import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";
import BarChart from "@/components/Utilities/BarChart";
import {calculateGrade, grades} from "@/lib/grades";

interface Props {
    userId: User['id'],
    notebookId: Notebook['id'],
    hideHeader?: boolean,
    height?: number,
    showSubmissions?: boolean
}

const StudentSubmissions: React.FC<Props> = ({ userId, notebookId, hideHeader, height, showSubmissions }) => {

    const { userSubmissions } = useUserSubmissions(userId, notebookId);

    return (
        <VStack
            w={'100%'}
            align={'flex-start'}
        >
            {
                !hideHeader && (
                    <Text
                        fontSize={'xl'}
                        fontWeight={'bold'}
                    >
                        Submissions
                    </Text>
                )
            }
            <BarChart
                height={height || 150}
                width={'100%'}
                data={grades.map((grade) => ({
                    grade: grade.grade,
                    "Assignments": userSubmissions.filter(submission => calculateGrade(
                        submission.submissions.reduce((acc, submission) => acc + (submission.points ? submission.points : 0), 0),
                        submission.submissions.length
                    ) === grade.grade).length
                }))}
                labelKey={'grade'}
                valueKey={'Assignments'}
            />
            {
                showSubmissions && (
                    userSubmissions.map(userSubmission => (
                        <StudentSubmission
                            key={userSubmission.assignmentId}
                            submission={userSubmission}
                        />
                    ))
                )
            }
        </VStack>
    );
};

export default StudentSubmissions;
