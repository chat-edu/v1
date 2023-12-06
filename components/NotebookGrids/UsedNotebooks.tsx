import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";
import UserPoints from "@/components/Utilities/Points/UserPoints";

import useUsedNotebooks from "@/hooks/queries/scores/notebooks/useUsedNotebooks";

import {User} from "@/types/User";
import {NotebookScore} from "@/types/score";

interface Props {
    user: User
    onClick: (notebook: NotebookScore) => void
}

const YourUsedNotebooks: React.FC<Props> = ({ user, onClick }) => {

    const { notebookScores, loading } = useUsedNotebooks(user.id);

    return (
        <NotebookGrid
            heading={`@${user.username}'s Recent Notebooks`}
            notebooks={notebookScores}
            loading={loading}
            onClick={onClick}
            noNotebooksComponent={
                <Text>
                    {`@${user.username} hasn't used any notebooks yet`}
                </Text>
            }
            rightComponent={(notebook) => {
                return (
                    <UserPoints
                        points={notebook.score}
                    />
                )
            }}
        />
    );
};

export default YourUsedNotebooks;
