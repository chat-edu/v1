import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";

import useUsedNotebooks from "@/hooks/queries/notebooks/useUsedNotebooks";

import {Notebook} from "@/types/Notebook";
import {User} from "@/types/User";

interface Props {
    user: User
    onClick: (notebook: Notebook) => void
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
                    <Text>
                        Score: {notebook.userScore}
                    </Text>
                )
            }}
        />
    );
};

export default YourUsedNotebooks;
