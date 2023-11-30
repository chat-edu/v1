import React from 'react';

import {Text, useDisclosure} from "@chakra-ui/react";

import ClickableCard from "@/components/Utilities/ClickableCard";
import NoteModal from "@/components/NotebookUtilities/NoteModal";

import {Note as NoteType} from "@/types/Note";

interface Props {
    note: NoteType
    authorId: string
}

const maxCharacters = 32;

const Note: React.FC<Props> = ({ note, authorId }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <NoteModal
                note={note}
                authorId={authorId}
                isOpen={isOpen}
                onClose={onClose}
            />
            <ClickableCard
                onClick={onOpen}
                overflowWrap={'break-word'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Text
                    overflowWrap={'break-word'}
                    maxW={'100%'}
                    fontWeight={'semibold'}
                    textAlign={'center'}
                >
                    {note.name.length > maxCharacters ? `${note.name.substring(0, maxCharacters)}...` : note.name}
                </Text>
            </ClickableCard>
        </>

    );
};

export default Note;
