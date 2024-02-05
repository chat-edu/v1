import React, {useMemo} from 'react';

import {Card, Text, Skeleton, Box} from "@chakra-ui/react";

import UserAssignment from "@/components/Notebook/Assignment/UserAssignment";
import TeacherAssignment from "@/components/Notebook/Assignment/TeacherAssignment";

import useAssignment from "@/hooks/queries/assignment/useAssignment";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/user/useUser";

import {Question, QuestionMap} from "@/types/assignment/Question";
import { Assignment as AssignmentType } from "@/types/assignment/Assignment";


interface Props {
    assignment: AssignmentType,
}

const Assignment: React.FC<Props> = ({ assignment }) => {

    const { user } = useAuth();
    const { isTeacher } = useUser(user?.id || '');

    const { assignmentWithQuestions, loading } = useAssignment(assignment.id);

    const questionMap: QuestionMap = useMemo(() => {
        const map: { [key: number]: Question<any> } = {};
        assignmentWithQuestions?.questions.forEach(question => {
            map[question.question.id] = question;
        });
        return map;
    }, [assignmentWithQuestions?.questions]);

    return (
        <Box
            p={4}
            w={'100%'}
        >
            <Card
                w={'100%'}
            >
                {
                    loading && !assignmentWithQuestions ? (
                        <Skeleton />
                    ) : (
                        assignmentWithQuestions ? (
                            isTeacher ? (
                                <TeacherAssignment
                                    assignment={assignmentWithQuestions}
                                    questionMap={questionMap}
                                />
                            ) : (
                                <UserAssignment
                                    assignment={assignmentWithQuestions}
                                    questionMap={questionMap}
                                />
                            )
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
