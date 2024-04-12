import React from 'react';

import {Container, Flex, Stack} from "@chakra-ui/react";

import NotebookMenu from "@/components/Notebook/NotebookContent/NotebookMenu";
import Lesson from "@/components/Notebook/NotebookContent/Lesson";
import ChatLanding from "@/components/Chat/ChatLanding";
import Chat from "@/components/Chat";
import Assignment from "@/components/Notebook/NotebookContent/Assignment";

import useInteractiveNotebook, {Modes} from "@/hooks/useInteractiveNotebook";

import {mobileNavbarHeight, navbarHeight} from "@/components/Layout/Navbar";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookContent/NotebookMenu/MobileHeader";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook,
    setOverviewMode?: () => void
}

const NotebookContent: React.FC<Props> = ({ notebook, setOverviewMode }) => {

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
                selectedNotes={selectedNotes}
                selectNotes={selectNotes}
                selectedAssignment={selectedAssignment}
                selectAssignment={selectAssignment}
                setOverviewMode={setOverviewMode}
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
                            <ChatLanding
                                notebookId={notebook.id}
                            />
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
                                selectNotes={selectNotes}
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

export default NotebookContent;
