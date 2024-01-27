import React from 'react';

import {Stack} from "@chakra-ui/react";

import NotebookMenu from "@/components/Notebook/NotebookMenu";
import Lesson from "@/components/Notebook/Lesson";

import useSelectLesson from "@/hooks/useSelectLesson";

import {Notebook} from "@/types/Notebook";
import {Note} from "@/types/Note";

interface Props {
    notebook: Notebook,
    initialNoteId?: Note["id"]
}

const NotebookLayout: React.FC<Props> = ({ notebook }) => {

    const { selectedLesson, selectLesson, deselectLesson } = useSelectLesson();

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
            />
            <Lesson
                selectedLesson={selectedLesson}
            />
        </Stack>
    );
};

export default NotebookLayout;
