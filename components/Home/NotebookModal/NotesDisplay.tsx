import React from 'react';

import {SimpleGrid, Text, VStack} from "@chakra-ui/react";

import Note from "@/components/Home/NotebookModal/Note";
import Loading from "@/components/Utilities/Loading";

import useNotes from "@/hooks/queries/notes/useNotes";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebookId: Notebook["id"],
    allowAddNote?: boolean
}

const NotesDisplay: React.FC<Props> = ({ notebookId, allowAddNote }) => {

    const { notes, loading } = useNotes(notebookId);

    return (
        <VStack
            align={'left'}
            w={'100%'}
            flex={1}
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
                            }}
                            spacing={{
                                base: 2,
                                md: 4,
                            }}
                        >
                            {
                                notes.map((note) => (
                                    <Note
                                        key={note.id}
                                        note={note}
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
