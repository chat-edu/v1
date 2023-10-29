import React from 'react';

import {Stack, VStack} from "@chakra-ui/react";

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
            <Stack
                w={'100%'}
                flex={1}
                gap={0}
                direction={{base: 'column', md: 'row'}}
            >
                <Sidebar
                    addNote={addNote}
                    removeNote={removeNote}
                    notes={notes}
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
            </Stack>
        </VStack>
    );
};

export default Home;
