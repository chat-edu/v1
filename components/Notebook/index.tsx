import React from 'react';

import {Skeleton, Text} from "@chakra-ui/react";

import NotebookLayout from "@/components/Notebook/NotebookLayout";

import useNotebook from "@/hooks/queries/notebooks/useNotebook";

import {Notebook as NotebookType} from "@/types/Notebook";

interface Props {
    notebookId: NotebookType["id"]
}

const Notebook: React.FC<Props> = ({ notebookId }) => {

    const { notebook, loading } = useNotebook(notebookId);

    if(loading) return (
        <Skeleton />
    );

    if(!notebook) return (
        <Text>
            Notebook not found
        </Text>
    );

    return (
        <NotebookLayout
            notebook={notebook}
        />
    );
};

export default Notebook;
