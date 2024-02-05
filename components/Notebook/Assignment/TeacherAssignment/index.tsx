import React from 'react';

import {VStack} from "@chakra-ui/react";

import AssignmentHeader from "@/components/Notebook/Assignment/AssignmentHeader";
import TeacherQuestions from "@/components/Notebook/Assignment/TeacherAssignment/TeacherQuestions";
import TeacherSummaries from "@/components/Notebook/Assignment/TeacherAssignment/TeacherSummaries";

import {QuestionMap} from "@/types/assignment/Question";
import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import CommonlyMissedProblems from "@/components/Notebook/Assignment/TeacherAssignment/CommonlyMissedProblems";

interface Props {
    assignment: AssignmentWithQuestions,
    questionMap: QuestionMap
}

const TeacherAssignment: React.FC<Props> = ({ assignment, questionMap }) => {
    return (
        <VStack
            w={'100%'}
            spacing={8}
            alignItems={'flex-start'}
        >
            <AssignmentHeader
                assignment={assignment}
                isTeacher={true}
            />
            <TeacherSummaries
                assignmentWithQuestions={assignment}
                questionMap={questionMap}
            />
            <CommonlyMissedProblems
                assignmentWithQuestions={assignment}
            />
            <TeacherQuestions
                assignment={assignment}
            />
        </VStack>
    );
};

export default TeacherAssignment;
