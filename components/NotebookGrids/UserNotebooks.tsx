import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";

import useUserNotebooks from "@/hooks/queries/notebooks/useUserNotebooks";

import {Notebook} from "@/types/Notebook";
import {User} from "@/types/User";

interface Props {
    user: User
    onClick: (notebook: Notebook) => void
}

const UserNotebooks: React.FC<Props> = ({ user, onClick }) => {

    const { notebooks, loading } = useUserNotebooks(user.id);

    return (
        <NotebookGrid
            heading={`@${user.username}'s Notebooks`}
            notebooks={notebooks}
            loading={loading}
            onClick={onClick}
            noNotebooksComponent={
                <Text>
                    {`@${user.username} hasn't created any notebooks yet`}
                </Text>
            }
        />
    );
};

export default UserNotebooks;
