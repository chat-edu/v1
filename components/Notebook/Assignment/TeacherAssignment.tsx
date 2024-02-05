import React from 'react';
import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {VStack} from "@chakra-ui/react";
import AssignmentHeader from "@/components/Notebook/Assignment/AssignmentHeader";
import Questions from "@/components/Notebook/Assignment/Questions";
import GenerateQuestions from "@/components/Notebook/Assignment/GenerateQuestions";
import Submissions from "@/components/Notebook/Assignment/Submissions";
import {QuestionMap} from "@/types/assignment/Question";

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
            <Questions
                assignmentWithQuestions={assignment}
            />
            <GenerateQuestions
                assignmentWithQuestions={assignment}
            />
            <Submissions
                assignmentWithQuestions={assignment}
                questionMap={questionMap}
            />
        </VStack>
    );
};

export default TeacherAssignment;
