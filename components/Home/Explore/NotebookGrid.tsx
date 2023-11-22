import React from 'react';

import {SimpleGrid, Skeleton, Text} from "@chakra-ui/react";

import NotebookCard from "@/components/Home/Explore/NotebookCard";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebooks: Notebook[]
    loading: boolean,
    noNotebooksComponent?: React.ReactNode
}

const NotebookGrid: React.FC<Props> = ({ notebooks, loading, noNotebooksComponent}) => {
    if(loading) {
        return (
            <Skeleton />
        )
    }

    return (
        <SimpleGrid
            columns={{
                base: 1,
                md: 2,
                lg: 3
            }}
            w={'100%'}
            gap={{
                base: 2,
                md: 4
            }}
        >
            {
                notebooks.length > 0 ? (
                    notebooks.map(notebook => (
                        <NotebookCard
                            key={notebook.id}
                            notebook={notebook}
                        />
                    ))
                ) : (
                    noNotebooksComponent || (
                        <Text>
                            No notebooks found
                        </Text>
                    )
                )

            }
        </SimpleGrid>
    );
};

export default NotebookGrid;
