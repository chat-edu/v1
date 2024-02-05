import React from 'react';

import {Skeleton, VStack} from "@chakra-ui/react";

import AssignmentHeader from "@/components/Notebook/NotebookContent/Assignment/AssignmentHeader";
import Questions from "@/components/Notebook/NotebookContent/Assignment/Questions/Questions";
import Submission from "@/components/Notebook/NotebookContent/Assignment/Submissions/Submission";

import useUserSubmission from "@/hooks/queries/submissions/useUserSubmission";
import useAuth from "@/hooks/useAuth";

import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {QuestionMap} from "@/types/assignment/Question";

interface Props {
    assignment: AssignmentWithQuestions,
    questionMap: QuestionMap
}

const UserAssignment: React.FC<Props> = ({ assignment, questionMap }) => {

    const { user } = useAuth();

    const { userSubmission, loading } = useUserSubmission(assignment.id, user?.id || '');

    return (
        <VStack
            w={'100%'}
            spacing={4}
            alignItems={'flex-start'}
        >
            <AssignmentHeader
                assignment={assignment}
                isTeacher={false}
            />
            {
                loading ? (
                    <Skeleton />
                ) : (
                    userSubmission ? (
                        <Submission
                            userSubmission={userSubmission}
                            questionMap={questionMap}
                        />
                    ) : (
                        <Questions
                            assignmentWithQuestions={assignment}
                        />
                    )
                )
            }
        </VStack>
    );
};

export default UserAssignment;
