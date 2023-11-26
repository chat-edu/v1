import React from 'react';

import YourNotebooks from "@/components/NotebookGrids/YourNotebooks";
import PopularNotebooks from "@/components/NotebookGrids/PopularNotebooks";
import ExploreHeader from "@/components/Home/Explore/ExploreHeader";
import YourUsedNotebooks from "@/components/NotebookGrids/YourUsedNotebooks";
import NotebookModal from "@/components/Home/NotebookModal";
import Container from "@/components/Utilities/Container";
import ExploreLeaderboard from "@/components/Home/Explore/ExploreLeaderboard";

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
            <Container>
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
                <ExploreLeaderboard />
            </Container>
        </>
    );
};

export default Explore;
