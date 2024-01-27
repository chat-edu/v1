import React from 'react';

import dynamic from "next/dynamic";

import {Button, Container, Flex, Heading, HStack} from "@chakra-ui/react";

import {mobileNavbarHeight, navbarHeight} from "@/components/Layout/Navbar";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookMenu/MobileHeader";
import ChatLanding from "@/components/Chat/ChatLanding";

import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

import {updateNote} from "@/services/notes";

import {Note} from "@/types/Note";
import Markdown from "@/components/Utilities/Markdown";


const Editor = dynamic(() => import('@/components/Utilities/Editor'), {
    ssr: false
})

interface Props {
    selectedLesson: Note | null
}

enum ViewModes {
    EDIT = 'edit',
    PREVIEW = 'view'
}

const Lesson: React.FC<Props> = ({ selectedLesson }) => {

    const { height } = useViewportDimensions();

    const [viewMode, setViewMode] = React.useState<ViewModes>(ViewModes.EDIT);

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
                            save={async (markdown: string) => updateNote(selectedLesson.id, selectedLesson.notebookId,{
                                content: markdown
                            })}
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
