import React from 'react';

import {Skeleton, Stack, VStack} from "@chakra-ui/react";

import HomeLanding from "@/components/Home/HomeLanding";
import Sidebar from "@/components/Home/NotesMenu";
import Chat from "@/components/Home/Chat";

import useHome from "@/hooks/home/useHome";
import useUser from "@/hooks/queries/useUser";
import Onboarding from "@/components/Home/Onboarding";

const Home = () => {

    const { userData, user, loading: userLoading } = useUser();

    const { notes, addNote, removeNote } = useHome();

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
                    userData?.isOnboarded ? (
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
                    ) : (
                        <Onboarding
                            user={user}
                        />
                    )
                )
            }
        </VStack>
    );
};

export default Home;
