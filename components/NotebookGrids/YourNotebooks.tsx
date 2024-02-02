import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";

import useUserNotebooks from "@/hooks/queries/scores/notebooks/useUserNotebooks";
import useAuth from "@/hooks/useAuth";

import {NotebookScore} from "@/types/score";

interface Props {
    onClick: (notebook: NotebookScore) => void
}

const YourNotebooks: React.FC<Props> = ({ onClick }) => {

    const { user } = useAuth();

    const { notebooks, loading } = useUserNotebooks(user?.id || "");

    return (
        <NotebookGrid
            heading={'Your Classrooms'}
            notebooks={notebooks}
            loading={loading}
            onClick={onClick}
            noNotebooksComponent={
                <Text>
                    {"You don't have any classrooms yet"}
                </Text>
            }
            addNotebook
            authGate
        />
    );
};

export default YourNotebooks;
