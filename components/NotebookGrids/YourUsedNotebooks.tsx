import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";
import Points from "@/components/Utilities/Points";

import useAuth from "@/hooks/useAuth";
import useUsedNotebooks from "@/hooks/queries/scores/notebooks/useUsedNotebooks";

import {NotebookScore} from "@/types/score";

interface Props {
    onClick: (notebook: NotebookScore) => void
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
                    <Points
                        points={notebook.score}
                    />
                )
            }}
            authGate
        />
    );
};

export default YourUsedNotebooks;
