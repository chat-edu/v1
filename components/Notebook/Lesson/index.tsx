import React from 'react';

import dynamic from "next/dynamic";

import {Button, Container, Flex, Heading, HStack, Skeleton, Text} from "@chakra-ui/react";

import Markdown from "@/components/Utilities/Markdown";
import {mobileNavbarHeight, navbarHeight} from "@/components/Layout/Navbar";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookMenu/MobileHeader";

import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";
import useUpdateNote from "@/hooks/mutators/update/useUpdateNote";
import useNote from "@/hooks/queries/notes/useNote";

import {Note} from "@/types/Note";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/user/useUser";


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

    const { user } = useAuth();
    const { isTeacher } = useUser(user?.id || '')

    const { height } = useViewportDimensions();

    const [viewMode, setViewMode] = React.useState<ViewModes>(ViewModes.PREVIEW);

    const { note, loading } = useNote(selectedLesson.id);
    const { updateNoteContent } = useUpdateNote(selectedLesson.id, selectedLesson.notebookId);

    if(loading && !note) return (
        <Skeleton />
    )

    if(!note) return (
        <Text
            w={'100%'}
            h={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            Note not found
        </Text>
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
                        {note.name}
                    </Heading>
                    {
                        isTeacher && (
                            <Button
                                onClick={() => setViewMode(viewMode === ViewModes.EDIT ? ViewModes.PREVIEW : ViewModes.EDIT)}
                            >
                                {viewMode === ViewModes.EDIT ? 'Preview' : 'Edit'}
                            </Button>
                        )
                    }
                </HStack>
                {
                    viewMode === ViewModes.EDIT ? (
                        <Editor
                            initialMarkdown={note.content}
                            save={(markdown: string) => updateNoteContent(markdown)}
                        />
                    ) : (
                        <Markdown>
                            {note.content}
                        </Markdown>
                    )
                }
            </Flex>
        </Container>
    );
};

export default Lesson;
