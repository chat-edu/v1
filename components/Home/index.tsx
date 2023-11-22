import React from 'react';

import {Skeleton, Stack, VStack} from "@chakra-ui/react";

import Sidebar from "@/components/Home/NotesMenu";
import Chat from "@/components/Chat";
import Onboarding from "@/components/Home/Onboarding";

import useSelectNotes from "@/hooks/useSelectNotes";
import useUser from "@/hooks/queries/useUser";

const Home = () => {

    const { userData, user, loading: userLoading } = useUser();

    const { selectedNotes, addNote, removeNote } = useSelectNotes();

    if(!user) return;

    return (
        <VStack
            flex={1}
            w={'100%'}
            spacing={4}
        >
            {
                userLoading ? (
                    <Skeleton />
                ) : (
                    userData ? (
                        <Stack
                            w={'100%'}
                            flex={1}
                            gap={0}
                            direction={{base: 'column', md: 'row'}}
                        >
                            <Sidebar
                                addNote={addNote}
                                removeNote={removeNote}
                                notes={selectedNotes}
                            />
                            <Chat
                                notes={selectedNotes}
                            />
                        </Stack>
                    ) : (
                        <Onboarding
                            userId={user.id}
                        />
                    )
                )
            }
        </VStack>
    );
};

export default Home;
