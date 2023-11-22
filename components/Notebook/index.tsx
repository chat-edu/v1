import React from 'react';
import {Skeleton, Text} from "@chakra-ui/react";
import useNotebook from "@/hooks/queries/useNotebook";
import NotebookLayout from "@/components/Notebook/NotebookLayout";

interface Props {
    notebookId: string
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
