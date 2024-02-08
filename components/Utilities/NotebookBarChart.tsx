import React, {useMemo} from 'react';

import {Skeleton} from "@chakra-ui/react";

import BarChart from "@/components/Utilities/BarChart";

import useNotebookSubmissions from "@/hooks/queries/submissions/useNotebookSubmissions";

import {calculateGrade, grades} from "@/lib/grades";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebookId: Notebook["id"],
    height: number
}

const NotebookBarChart: React.FC<Props> = ({ notebookId, height }) => {

    const { userSubmissionsMap, loading } = useNotebookSubmissions(notebookId);

    const gradesData = useMemo(() => {
        const gradesData: {grade: string, "Students": number}[] = [];
        if(!userSubmissionsMap) return gradesData;
        grades.forEach(grade => {
            let count = 0;
            for (const [_, submissions] of userSubmissionsMap) {
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

    if(loading) {
        return (
            <Skeleton
                height={`${height}px`}
                width={'100%'}
            />
        )
    }

    return (
        <BarChart
            height={height}
            width={'100%'}
            data={gradesData}
            labelKey={'grade'}
            valueKey={'Students'}
        />
    );
};

export default NotebookBarChart;
