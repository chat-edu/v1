import React from 'react';

import {SimpleGrid, Text} from "@chakra-ui/react";

import NotebookCard from "@/components/Home/Explore/NotebookCard";
import AddNotebookCard from "@/components/Home/AddNotebook/AddNotebookCard";
import Loading from "@/components/Utilities/Loading";
import SectionBlock from "@/components/Utilities/SectionBlock";

import {Notebook} from "@/types/Notebook";

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
        <SectionBlock
            heading={heading}
            headingRightComponent={headingRightComponent}
        >
            <Loading
                loading={loading}
                h={'50px'}
            >
                {
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
                }
            </Loading>
        </SectionBlock>
    );
};

export default NotebookGrid;
