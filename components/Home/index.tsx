import React from 'react';

import YourNotebooks from "@/components/NotebookGrids/YourNotebooks";
import HomeHeader from "@/components/Home/HomeHeader";
import NotebookModal from "@/components/Home/NotebookModal";
import Container from "@/components/Utilities/Container";

import useNotebookModal from "@/hooks/utilities/useNotebookModal";

const Home = () => {

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
                <HomeHeader />
                <YourNotebooks
                    onClick={selectNotebook}
                />
            </Container>
        </>
    );
};

export default Home;
