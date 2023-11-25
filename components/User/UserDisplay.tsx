import React from 'react';

import {VStack} from "@chakra-ui/react";

import UserHeader from "@/components/User/UserHeader";
import UserNotebooks from "@/components/NotebookGrids/UserNotebooks";
import NotebookModal from "@/components/Home/NotebookModal";

import useNotebookModal from "@/hooks/utilities/useNotebookModal";

import {User} from "@/types/User";
import UsedNotebooks from "@/components/NotebookGrids/UsedNotebooks";

interface Props {
    user: User
}

const UserDisplay: React.FC<Props> = ({ user }) => {

    const { notebook, selectNotebook, isOpen, closeNotebookModal } = useNotebookModal();

    return (
        <>
            {
                notebook && (
                    <NotebookModal
                        notebook={notebook}
                        isOpen={isOpen}
                        onClose={closeNotebookModal}
                    />
                )
            }
            <VStack
                w={'100%'}
                spacing={8}
            >
                <UserHeader
                    user={user}
                />
                <UserNotebooks
                    user={user}
                    onClick={selectNotebook}
                />
                <UsedNotebooks
                    user={user}
                    onClick={selectNotebook}
                />
            </VStack>
        </>

    );
};

export default UserDisplay;
