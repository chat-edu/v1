import React from 'react';

import {Heading, VStack} from "@chakra-ui/react";

import Submission from "@/components/Notebook/Assignment/Submission";

import useSubmissions from "@/hooks/queries/submissions/useSubmissions";

import {QuestionMap} from "@/types/assignment/Question";
import {AssignmentWithQuestions} from "@/types/assignment/Assignment";

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
