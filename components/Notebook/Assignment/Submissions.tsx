import React, {useMemo} from 'react';

import {Heading, VStack} from "@chakra-ui/react";

import useSubmissions from "@/hooks/queries/submissions/useSubmissions";
import {Question, QuestionMap} from "@/types/assignment/Question";
import {AssignmentWithQuestions} from "@/types/assignment/Assignment";
import Submission from "@/components/Notebook/Assignment/Submission";

interface Props {
    assignmentWithQuestions: AssignmentWithQuestions;
}

const Submissions: React.FC<Props> = ({ assignmentWithQuestions}) => {

    const { userSubmissions } = useSubmissions(assignmentWithQuestions.id);

    const questionMap: QuestionMap = useMemo(() => {
        const map: { [key: number]: Question<any> } = {};
        assignmentWithQuestions.questions.forEach(question => {
            map[question.question.id] = question;
        });
        return map;
    }, [assignmentWithQuestions.questions]);

    return (
        <VStack
            w={'100%'}
            align={'flex-start'}
        >
            <Heading>
                Submissions
            </Heading>
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
