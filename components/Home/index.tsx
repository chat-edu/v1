import React from 'react';

import {HStack, VStack} from "@chakra-ui/react";

import HomeLanding from "@/components/Home/HomeLanding";
import Sidebar from "@/components/Home/Sidebar";
import Chat from "@/components/Home/Chat";

import useHome from "@/hooks/home/useHome";

const Home = () => {

    const { notes, addNote, removeNote } = useHome();

    return (
        <VStack
            flex={1}
            w={'100%'}
            spacing={4}
        >
            <HStack
                w={'100%'}
                flex={1}
                gap={0}
            >
                <Sidebar
                    addNote={addNote}
                    removeNote={removeNote}
                />
                {
                    notes.length > 0 ? (
                        <Chat
                            notes={notes}
                        />
                    ) : (
                        <HomeLanding />
                    )
                }
            </HStack>
        </VStack>
    );
};

export default Home;
