import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";

import useAuth from "@/hooks/useAuth";
import useUsedNotebooks from "@/hooks/queries/notebooks/useUsedNotebooks";

import {Notebook} from "@/types/Notebook";

interface Props {
    onClick: (notebook: Notebook) => void
}

const YourUsedNotebooks: React.FC<Props> = ({ onClick }) => {

    const { user } = useAuth();

    const { notebookScores, loading } = useUsedNotebooks(user?.id || "");

    if(!user) return null;

    return (
        <NotebookGrid
            heading={'Your Recent Notebooks'}
            notebooks={notebookScores}
            loading={loading}
            onClick={onClick}
            noNotebooksComponent={
                <Text>
                    {"You haven't used any notebooks yet"}
                </Text>
            }
            rightComponent={(notebook) => {
                return (
                    <Text>
                        Your Score: {notebook.userScore}
                    </Text>
                )
            }}
            authGate
        />
    );
};

export default YourUsedNotebooks;
