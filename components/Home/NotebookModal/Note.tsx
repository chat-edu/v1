import React from 'react';

import {Text, useDisclosure} from "@chakra-ui/react";

import ClickableCard from "@/components/Utilities/ClickableCard";
import NoteModal from "@/components/NotebookUtilities/NoteModal";

import {Note as NoteType} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

interface Props {
    note: NoteType
    notebook: Notebook
}

const maxCharacters = 32;

const Note: React.FC<Props> = ({ note, notebook }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <NoteModal
                note={note}
                notebook={notebook}
                isOpen={isOpen}
                onClose={onClose}
            />
            <ClickableCard
                onClick={onOpen}
                overflowWrap={'break-word'}
            >
                <Text
                    overflowWrap={'break-word'}
                    maxW={'100%'}
                >
                    {note.name.length > maxCharacters ? `${note.name.substring(0, maxCharacters)}...` : note.name}
                </Text>
            </ClickableCard>
        </>

    );
};

export default Note;
