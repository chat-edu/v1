import React from 'react';

import {Container, Flex, Stack} from "@chakra-ui/react";

import NotebookMenu from "@/components/Notebook/NotebookMenu";
import Lesson from "@/components/Notebook/Lesson";
import ChatLanding from "@/components/Chat/ChatLanding";
import Chat from "@/components/Chat";
import Assignment from "@/components/Notebook/Assignment";

import useInteractiveNotebook, {Modes} from "@/hooks/useInteractiveNotebook";

import {Notebook} from "@/types/Notebook";
import {Note} from "@/types/Note";
import {mobileNavbarHeight, navbarHeight} from "@/components/Layout/Navbar";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookMenu/MobileHeader";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

interface Props {
    notebook: Notebook,
    initialNoteId?: Note["id"]
}

const NotebookLayout: React.FC<Props> = ({ notebook }) => {

    const {
        selectedLesson,
        selectedNotes,
        selectedAssignment,
        mode,
        selectLesson,
        deselectLesson,
        selectNotes,
        selectAssignment
    } = useInteractiveNotebook();

    const { height } = useViewportDimensions();

    return (
        <Stack
            w={'100%'}
            flex={1}
            gap={0}
            direction={{base: 'column', md: 'row'}}
        >
            <NotebookMenu
                notebook={notebook}
                selectLesson={selectLesson}
                deselectLesson={deselectLesson}
                selectedLesson={selectedLesson}
                selectNotes={selectNotes}
                selectAssignment={selectAssignment}
            />
            <Container
                w={'100%'}
                maxW={'6xl'}
                p={0}
                h={{
                    base: height - mobileNavbarHeight - mobileHeaderHeight,
                    md: height - navbarHeight
                }}
            >
                <Flex
                    p={{
                        base: 0,
                        md: 4
                    }}
                    flexDirection={'column'}
                    w={'100%'}
                    position={'relative'}
                    overflow={'auto'}
                    h={'100%'}
                >
                    {
                        !selectedLesson && selectedNotes.length === 0 && selectedAssignment === null && (
                            <ChatLanding />
                        )
                    }
                    {
                        mode === Modes.CHAT && selectedNotes.length > 0 && (
                            <Chat
                                notebookId={notebook.id}
                                notes={selectedNotes}
                            />
                        )
                    }
                    {
                        mode === Modes.CONTENT && selectedLesson && (
                            <Lesson
                                selectedLesson={selectedLesson}
                            />
                        )
                    }
                    {
                        mode === Modes.ASSIGNMENT && selectedAssignment && (
                            <Assignment
                                assignment={selectedAssignment}
                            />
                        )
                    }
                </Flex>
            </Container>
        </Stack>
    );
};

export default NotebookLayout;
