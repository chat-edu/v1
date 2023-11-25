import React from 'react';

import {Heading, HStack, SimpleGrid, Skeleton, Text, VStack} from "@chakra-ui/react";

import NotebookCard from "@/components/Home/Explore/NotebookCard";

import {Notebook} from "@/types/Notebook";
import AddNotebookCard from "@/components/Home/AddNotebook/AddNotebookCard";

interface Props<NotebookType extends Notebook> {
    heading: string,
    notebooks: NotebookType[]
    loading: boolean,
    onClick: (notebook: NotebookType) => void,
    headingRightComponent?: React.ReactNode,
    noNotebooksComponent?: React.ReactNode,
    rightComponent?: (notebook: NotebookType, index: number) => React.ReactNode,
    addNotebook?: boolean
}

const NotebookGrid = <NotebookType extends Notebook>({ heading, headingRightComponent, notebooks, loading, onClick, noNotebooksComponent, rightComponent, addNotebook}: Props<NotebookType>) => {
    return (
        <VStack
            spacing={4}
            align={'start'}
            w={'100%'}
        >
            <HStack
                w={'100%'}
                justify={'space-between'}
            >
                <Heading
                    size={{
                        base: 'md',
                        md: 'lg'
                    }}
                >
                    {heading}
                </Heading>
                {headingRightComponent}
            </HStack>
            {
                loading ? (
                    <Skeleton
                        h={'50px'}
                    />
                ) : (
                    notebooks.length === 0 && !addNotebook ? (
                        noNotebooksComponent || (
                            <Text>
                                No notebooks found
                            </Text>
                        )
                    ) : (
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
                                addNotebook && (
                                    <AddNotebookCard />
                                )
                            }
                            {
                                notebooks.map((notebook, index) => (
                                    <NotebookCard
                                        key={notebook.id}
                                        notebook={notebook}
                                        rightComponent={rightComponent ? rightComponent(notebook, index) : undefined}
                                        onClick={() => onClick(notebook)}
                                    />
                                ))
                            }
                        </SimpleGrid>
                    )
                )
            }
        </VStack>
    );
};

export default NotebookGrid;
