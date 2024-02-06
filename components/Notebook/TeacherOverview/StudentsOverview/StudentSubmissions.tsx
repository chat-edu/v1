import React from 'react';

import useUserSubmissions from "@/hooks/queries/submissions/useUserSubmissions";

import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel, Divider, Flex,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";

import SubmissionSummary from "@/components/Notebook/NotebookContent/Assignment/Submissions/SubmissionSummary";

import {QuestionTypes} from "@/types/assignment/Question";
import StudentSubmission from "@/components/Notebook/TeacherOverview/StudentsOverview/StudentSubmission";

interface Props {
    userId: User['id'],
    notebookId: Notebook['id']
}

const StudentSubmissions: React.FC<Props> = ({ userId, notebookId }) => {

    const { userSubmissions } = useUserSubmissions(userId, notebookId);

    return (
        <VStack
            w={'100%'}
            align={'flex-start'}
        >
            <Text
                fontSize={'xl'}
                fontWeight={'bold'}
            >
                Submissions
            </Text>
            {
                userSubmissions.map(userSubmission => (
                    <StudentSubmission
                        key={userSubmission.assignmentId}
                        submission={userSubmission}
                    />
                ))
            }
        </VStack>
    );
};

export default StudentSubmissions;
