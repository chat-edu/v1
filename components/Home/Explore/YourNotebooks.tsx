import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/Home/Explore/NotebookGrid";

import useUserNotebooks from "@/hooks/queries/notebooks/useUserNotebooks";
import useAuth from "@/hooks/useAuth";

import {Notebook} from "@/types/Notebook";

interface Props {
    onClick: (notebook: Notebook) => void
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
        />
    );
};

export default YourNotebooks;
