import React from 'react';
import {NoteInput} from "@/types/Note";
import {Button, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import GeneratedNote from "@/components/AddModals/AddNote/GeneratedNote";

interface Props {
    generatedNotes: NoteInput[],
    onConfirm: (index: number) => Promise<void>,
    onRegenerate: (index: number) => Promise<void>,
    onDelete: (index: number) => void,
    onClose: () => void
}

const GeneratedNotes: React.FC<Props> = ({ generatedNotes, onRegenerate, onConfirm, onDelete, onClose }) => {

    if(generatedNotes.length === 0) {
        return (
            <VStack
                w={'100%'}
            >
                <Text
                    fontWeight={'bold'}
                >
                    All Notes Processed
                </Text>
                <Button
                    onClick={onClose}
                >
                    Done
                </Button>
            </VStack>
        )
    }

    return (
        <SimpleGrid
            columns={{
                base: 1,
                md: 2,
            }}
            spacing={2}
        >
            {
                generatedNotes.map((generatedNote, index) => (
                    <GeneratedNote
                        key={generatedNote.name}
                        generatedNote={generatedNote}
                        onConfirm={() => onConfirm(index)}
                        onRegenerate={() => onRegenerate(index)}
                        onDelete={() => onDelete(index)}
                    />
                ))
            }
        </SimpleGrid>
    );
};

export default GeneratedNotes;
