import React from 'react';

import {SimpleGrid, Skeleton, Text} from "@chakra-ui/react";

import NotebookCard from "@/components/Home/Explore/NotebookCard";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebooks: Notebook[]
    loading: boolean,
    noNotebooksComponent?: React.ReactNode,
    ranked?: boolean
}

const NotebookGrid: React.FC<Props> = ({ notebooks, loading, noNotebooksComponent, ranked}) => {
    if(loading) {
        return (
            <Skeleton />
        )
    }

    if(notebooks.length === 0) {
        return noNotebooksComponent || (
            <Text>
                No notebooks found
            </Text>
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
                notebooks.map((notebook, index) => (
                    <NotebookCard
                        key={notebook.id}
                        notebook={notebook}
                        rank={ranked ? index + 1 : undefined}
                    />
                ))
            }
        </SimpleGrid>
    );
};

export default NotebookGrid;
