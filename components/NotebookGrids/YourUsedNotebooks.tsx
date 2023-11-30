import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";
import UserPoints from "@/components/Utilities/Points/UserPoints";

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
                    <VStack
                        justifyContent={'flex-end'}
                        h={'100%'}
                    >
                        <UserPoints
                            points={notebook.score}
                        />
                    </VStack>
                )
            }}
            authGate
        />
    );
};

export default YourUsedNotebooks;
