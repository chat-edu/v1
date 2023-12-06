import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";

import useUserNotebooks from "@/hooks/queries/scores/notebooks/useUserNotebooks";

import {User} from "@/types/User";
import {NotebookScore} from "@/types/score";
import NotebookPoints from "@/components/Utilities/Points/NotebookPoints";

interface Props {
    user: User
    onClick: (notebook: NotebookScore) => void
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
            rightComponent={(notebook) => (
                <NotebookPoints
                    points={notebook.score}
                />
            )}
        />
    );
};

export default UserNotebooks;
