import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";

import useUserNotebooks from "@/hooks/queries/scores/notebooks/useUserNotebooks";
import useAuth from "@/hooks/useAuth";

import {NotebookScore} from "@/types/score";
import NotebookPoints from "@/components/Utilities/Points/NotebookPoints";

interface Props {
    onClick: (notebook: NotebookScore) => void
}

const YourNotebooks: React.FC<Props> = ({ onClick }) => {

    const { user } = useAuth();

    const { notebooks, loading } = useUserNotebooks(user?.id || "");

    return (
        <NotebookGrid
            heading={'Your Notebooks'}
            notebooks={notebooks}
            loading={loading}
            onClick={onClick}
            noNotebooksComponent={
                <Text>
                    {"You don't have any notebooks yet"}
                </Text>
            }
            addNotebook
            authGate
            rightComponent={(notebook) => (
                <VStack
                    justifyContent={'flex-end'}
                    h={'100%'}
                >
                    <NotebookPoints
                        points={notebook.score}
                    />
                </VStack>
            )}
        />
    );
};

export default YourNotebooks;
