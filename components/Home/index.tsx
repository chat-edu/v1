import React from 'react';

import YourNotebooks from "@/components/NotebookGrids/YourNotebooks";
import PopularNotebooks from "@/components/NotebookGrids/PopularNotebooks";
import HomeHeader from "@/components/Home/HomeHeader";
import YourUsedNotebooks from "@/components/NotebookGrids/YourUsedNotebooks";
import NotebookModal from "@/components/Home/NotebookModal";
import Container from "@/components/Utilities/Container";
import HomeUsersLeaderboard from "@/components/Home/HomeUsersLeaderboard";

import useNotebookModal from "@/hooks/utilities/useNotebookModal";
import HomeCreatorsLeaderboard from "@/components/Home/HomeCreatorsLeaderboard";

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
                <PopularNotebooks
                    onClick={selectNotebook}
                />
                <YourUsedNotebooks
                    onClick={selectNotebook}
                />
                <HomeUsersLeaderboard />
                <HomeCreatorsLeaderboard />
            </Container>
        </>
    );
};

export default Home;
