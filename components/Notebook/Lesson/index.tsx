import React from 'react';

import dynamic from "next/dynamic";

import {Button, Container, Flex, Heading, HStack} from "@chakra-ui/react";

import ChatLanding from "@/components/Chat/ChatLanding";
import Markdown from "@/components/Utilities/Markdown";
import {mobileNavbarHeight, navbarHeight} from "@/components/Layout/Navbar";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookMenu/MobileHeader";

import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";
import useUpdateNote from "@/hooks/mutators/useUpdateNote";

import {Note} from "@/types/Note";


const Editor = dynamic(() => import('@/components/Utilities/Editor'), {
    ssr: false
})

interface Props {
    selectedLesson: Note
}

enum ViewModes {
    EDIT = 'edit',
    PREVIEW = 'view'
}

const Lesson: React.FC<Props> = ({ selectedLesson }) => {

    const { height } = useViewportDimensions();

    const [viewMode, setViewMode] = React.useState<ViewModes>(ViewModes.EDIT);

    const { updateNoteContent } = useUpdateNote(selectedLesson.id, selectedLesson.notebookId);

    if(!selectedLesson) return (
        <ChatLanding />
    )

    return (
        <Container
            w={'100%'}
            maxW={'6xl'}
            p={4}
            h={{
                base: height - mobileNavbarHeight - mobileHeaderHeight,
                md: height - navbarHeight
            }}
        >
            <Flex
                flexDirection={'column'}
                w={'100%'}
                position={'relative'}
                overflow={'auto'}
                h={'100%'}
                gap={4}
            >
                <HStack
                    w={'100%'}
                    justifyContent={'space-between'}
                >
                    <Heading>
                        {selectedLesson.name}
                    </Heading>
                    {
                        viewMode === ViewModes.EDIT ? (
                            <Button
                                onClick={() => setViewMode(ViewModes.PREVIEW)}
                            >
                                Preview
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setViewMode(ViewModes.EDIT)}
                            >
                                Edit
                            </Button>
                        )
                    }
                </HStack>
                {
                    viewMode === ViewModes.EDIT ? (
                        <Editor
                            initialMarkdown={selectedLesson.content}
                            save={(markdown: string) => updateNoteContent(markdown)}
                        />
                    ) : (
                        <Markdown>
                            {selectedLesson.content}
                        </Markdown>
                    )
                }
            </Flex>
        </Container>
    );
};

export default Lesson;
