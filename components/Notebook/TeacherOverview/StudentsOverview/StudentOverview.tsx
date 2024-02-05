import React from 'react';

import useUserNotebookSummary from "@/hooks/queries/summaries/useUserNotebookSummary";

import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";
import useUser from "@/hooks/queries/user/useUser";
import {Avatar, HStack, Image, Skeleton, Text, VStack} from "@chakra-ui/react";
import UsernameText from "@/components/Utilities/UsernameText";
import StudentSummary from "@/components/Notebook/TeacherOverview/StudentsOverview/StudentSummary";

interface Props {
    userId: User["id"],
    notebookId: Notebook["id"]
}

const StudentOverview: React.FC<Props> = ({ userId, notebookId }) => {

    const { userData, loading } = useUser(userId);

    if(loading) {
        return (
            <Skeleton
                w={'100%'}
                h={20}
            />
        )
    }

    if(!userData) {
        return null;
    }

    return (
        <VStack
            w={'100%'}
            spacing={4}
            alignItems={'flex-start'}
            borderWidth={1}
            p={4}
            rounded={'md'}
        >
            <HStack
                w={'100%'}
                spacing={4}
            >
                <Avatar
                    src={userData.profilePictureUrl || ''}
                    boxSize={'40px'}
                />
                <Text
                    fontWeight={'bold'}
                    fontSize={'lg'}
                >
                    {userData.name}
                </Text>
            </HStack>
            <StudentSummary
                userId={userId}
                notebookId={notebookId}
            />
        </VStack>
    );
};

export default StudentOverview;
