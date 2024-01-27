import React from 'react';

import {Stack} from "@chakra-ui/react";

import NotebookMenu from "@/components/Notebook/NotebookMenu";
import Lesson from "@/components/Notebook/Lesson";

import useSelectLesson, {Modes} from "@/hooks/useSelectLesson";

import {Notebook} from "@/types/Notebook";
import {Note} from "@/types/Note";
import ChatLanding from "@/components/Chat/ChatLanding";
import Chat from "@/components/Chat";

interface Props {
    notebook: Notebook,
    initialNoteId?: Note["id"]
}

const NotebookLayout: React.FC<Props> = ({ notebook }) => {

    const { selectedLesson, selectedNotes, selectLesson, deselectLesson, selectNotes, mode } = useSelectLesson();

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
            />
            {
                !selectedLesson && selectedNotes.length === 0 ? (
                    <ChatLanding />
                ) : (
                    mode === Modes.CHAT ? (
                        <Chat
                            notebookId={notebook.id}
                            notes={selectedNotes}
                        />
                    ) : (
                        <Lesson
                            selectedLesson={selectedLesson}
                        />
                    )
                )
            }
        </Stack>
    );
};

export default NotebookLayout;
