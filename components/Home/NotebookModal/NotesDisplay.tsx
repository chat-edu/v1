import React from 'react';

import {SimpleGrid, Text, VStack} from "@chakra-ui/react";

import Note from "@/components/Home/NotebookModal/Note";

import useNotes from "@/hooks/queries/notebook/useNotes";

import {Notebook} from "@/types/Notebook";
import Loading from "@/components/Utilities/Loading";

interface Props {
    notebook: Notebook
}

const NotesDisplay: React.FC<Props> = ({ notebook }) => {

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
                    notes.length > 0 ? (
                        <SimpleGrid
                            columns={{
                                base: 2,
                                md: 3,
                                lg: 4
                            }}
                            spacing={4}
                        >
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
