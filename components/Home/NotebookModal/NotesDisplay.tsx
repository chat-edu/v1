import React from 'react';

import {SimpleGrid, Text, VStack} from "@chakra-ui/react";

import Note from "@/components/Home/NotebookModal/Note";

import useNotes from "@/hooks/queries/notebook/useNotes";

import {Notebook} from "@/types/Notebook";
import Loading from "@/components/Utilities/Loading";
import AddNoteCard from "@/components/Home/AddNote/AddNoteCard";

interface Props {
    notebook: Notebook,
    allowAddNote?: boolean
}

const NotesDisplay: React.FC<Props> = ({ notebook, allowAddNote }) => {

    const { notes, loading } = useNotes(notebook.id);

    return (
        <VStack
            align={'left'}
            w={'100%'}
        >
            <Text
                fontWeight={'bold'}
            >
                Notes
            </Text>
            <Loading
                loading={loading}
                h={'50px'}
            >
                {
                    notes.length > 0 || allowAddNote ? (
                        <SimpleGrid
                            columns={{
                                base: 2,
                                md: 3,
                                lg: 4
                            }}
                            spacing={4}
                        >
                            <AddNoteCard
                                notebook={notebook}
                            />
                            {
                                notes.map((note) => (
                                    <Note
                                        key={note.id}
                                        note={note}
                                        notebook={notebook}
                                    />
                                ))
                            }
                        </SimpleGrid>
                    ) : (
                        <Text>
                            No notes yet
                        </Text>
                    )
                }
            </Loading>
        </VStack>
    );
};

export default NotesDisplay;
