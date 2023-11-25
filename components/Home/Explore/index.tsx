import React from 'react';

import {Container} from "@chakra-ui/react";

import YourNotebooks from "@/components/NotebookGrids/YourNotebooks";
import PopularNotebooks from "@/components/NotebookGrids/PopularNotebooks";
import ExploreHeader from "@/components/Home/Explore/ExploreHeader";
import YourUsedNotebooks from "@/components/NotebookGrids/YourUsedNotebooks";
import NotebookModal from "@/components/Home/NotebookModal";

import useNotebookModal from "@/hooks/utilities/useNotebookModal";

const Explore = () => {

    const { notebook, selectNotebook, isOpen, closeNotebookModal } = useNotebookModal();

    return (
        <>
            {
                notebook && (
                    <NotebookModal
                        notebook={notebook}
                        isOpen={isOpen}
                        onClose={closeNotebookModal}
                    />
                )
            }
            <Container
                maxW={'6xl'}
                py={{
                    base: 4,
                    md: 8
                }}
                display={'flex'}
                flexDir={'column'}
                gap={{
                    base: 4,
                    md: 8
                }}
            >
                <ExploreHeader />
                <YourNotebooks
                    onClick={selectNotebook}
                />
                <PopularNotebooks
                    onClick={selectNotebook}
                />
                <YourUsedNotebooks
                    onClick={selectNotebook}
                />
            </Container>
        </>
    );
};

export default Explore;
