import React from 'react';

import dynamic from "next/dynamic";

import {Button, Card, Container, Heading, HStack, Image, Skeleton, Text, Tooltip} from "@chakra-ui/react";

import Markdown from "@/components/Utilities/Markdown";
import {mobileNavbarHeight, navbarHeight} from "@/components/Layout/Navbar";
import {mobileHeaderHeight} from "@/components/Notebook/NotebookContent/NotebookMenu/MobileHeader";

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
    selectNotes: (notes: Note[]) => void
}

enum ViewModes {
    EDIT = 'edit',
    PREVIEW = 'view'
}

const Lesson: React.FC<Props> = ({ selectedLesson, selectNotes }) => {

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
            <Card
                flexDirection={'column'}
                w={'100%'}
                position={'relative'}
                overflow={'auto'}
                h={'100%'}
                gap={4}
                alignItems={'flex-start'}
            >
                <HStack
                    w={'100%'}
                    justifyContent={'space-between'}
                >
                    <HStack
                        spacing={4}
                    >
                        <Heading>
                            {note.name}
                        </Heading>
                        <Tooltip
                            label={'Ask Questions, Get Help, and Create Practice Problems'}
                            aria-label={'Ask ChatEDU'}
                        >
                            <Button
                                onClick={() => selectNotes([note])}
                                colorScheme={'brand'}
                                leftIcon={
                                    <Image
                                        alt={'logo'}
                                        src={'/logo.png'}
                                        boxSize={'24px'}
                                    />
                                }
                                p={4}
                                justifyContent={'flex-start'}
                                variant={'outline'}
                            >
                                Ask ChatEDU
                            </Button>
                        </Tooltip>
                    </HStack>

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
                            note={note}
                            save={(markdown: string) => updateNoteContent(markdown)}
                        />
                    ) : (
                        <Markdown>
                            {note.content}
                        </Markdown>
                    )
                }
            </Card>
        </Container>
    );
};

export default Lesson;
