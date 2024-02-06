import React, {useMemo} from 'react';

import {Card, Text, Skeleton, Box} from "@chakra-ui/react";

import UserAssignment from "@/components/Notebook/NotebookContent/Assignment/UserAssignment";
import TeacherAssignment from "@/components/Notebook/NotebookContent/Assignment/TeacherAssignment";

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
    const [questionMapLoading, setQuestionMapLoading] = React.useState<boolean>(true);

    const { assignmentWithQuestions, loading } = useAssignment(assignment.id);

    const questionMap: QuestionMap = useMemo(() => {
        setQuestionMapLoading(true);
        const map: { [key: string]: Question<any> } = {};
        assignmentWithQuestions?.questions.forEach(question => {
            map[`${question.tag}-${question.question.id}`] = question;
        });
        setQuestionMapLoading(false);
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
                    (loading && !assignmentWithQuestions) || questionMapLoading  ? (
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
