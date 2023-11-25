import React, {useState} from 'react';

import {Container, useDisclosure} from "@chakra-ui/react";

import YourNotebooks from "@/components/Home/Explore/YourNotebooks";
import PopularNotebooks from "@/components/Home/Explore/PopularNotebooks";
import ExploreHeader from "@/components/Home/Explore/ExploreHeader";
import YourUsedNotebooks from "@/components/Home/Explore/YourUsedNotebooks";

import {Notebook} from "@/types/Notebook";
import NotebookModal from "@/components/Home/NotebookModal";

const Explore = () => {

    const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const selectNotebook = (notebook: Notebook) => {
        setSelectedNotebook(notebook);
        onOpen();
    }

    return (
        <>
            {
                selectedNotebook && (
                    <NotebookModal
                        notebook={selectedNotebook}
                        isOpen={isOpen}
                        onClose={() => {
                            onClose();
                            setSelectedNotebook(null);
                        }}
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
