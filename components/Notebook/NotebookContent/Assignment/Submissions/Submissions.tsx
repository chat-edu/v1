import React from 'react';

import {Heading, VStack} from "@chakra-ui/react";

import Submission from "@/components/Notebook/NotebookContent/Assignment/Submissions/Submission";

import useSubmissions from "@/hooks/queries/submissions/useSubmissions";

import {QuestionMap} from "@/types/assignment/Question";
import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import BarChart from "@/components/Utilities/BarChart";
import {calculateGrade, grades} from "@/lib/grades";

interface Props {
    assignmentWithQuestions: AssignmentWithQuestions;
    questionMap: QuestionMap;
}

const Submissions: React.FC<Props> = ({ assignmentWithQuestions, questionMap}) => {

    const { userSubmissions } = useSubmissions(assignmentWithQuestions.id);

    return (
        <VStack
            w={'100%'}
            align={'flex-start'}
        >
            <Heading>
                Submissions
            </Heading>
            <BarChart
                height={150}
                width={"100%"}
                data={grades.map((grade, index) => ({
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
                userSubmissions.map(userSubmission => (
                    <Submission
                        userSubmission={userSubmission}
                        questionMap={questionMap}
                        key={userSubmission.userId}
                    />
                ))
            }
        </VStack>
    );
};

export default Submissions;
