import React from 'react';

import {HStack, IconButton, Text, useDisclosure} from "@chakra-ui/react";

import {AiFillEye} from "react-icons/ai";

import Link from "next/link";

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

    const onEyeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onOpen();
    }

    return (
        <>
            <NoteModal
                note={note}
                authorId={authorId}
                isOpen={isOpen}
                onClose={onClose}
            />
            <Link
                href={`/notebooks/${note.notebookId}?noteId=${note.id}`}
                style={{
                    height: '100%',
                    display: 'flex',
                    flex: 1
                }}
            >
                <ClickableCard
                    onClick={() => {}}
                    overflowWrap={'break-word'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flex={1}
                    h={'100%'}
                >
                    <HStack
                        justifyContent={'space-between'}
                        w={'100%'}
                    >
                        <Text
                            overflowWrap={'break-word'}
                            maxW={'100%'}
                            fontWeight={'semibold'}
                        >
                            {note.name.length > maxCharacters ? `${note.name.substring(0, maxCharacters)}...` : note.name}
                        </Text>
                        <IconButton
                            onClick={onEyeClick}
                            aria-label={'View Note'}
                            icon={<AiFillEye />}
                            size={'xs'}
                        />
                    </HStack>
                </ClickableCard>
            </Link>
        </>
    );
};

export default Note;
