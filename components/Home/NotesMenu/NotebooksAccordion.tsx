import React, {useEffect} from 'react';

import {Accordion, Skeleton, Text, VStack} from "@chakra-ui/react";

import Notebook from "@/components/Home/NotesMenu/Notebook";
import AddNotebookButton from "@/components/Home/AddNotebook/AddNotebookButton";

import useAuth from "@/hooks/auth/useAuth";
import useUserNotebooks from "@/hooks/queries/useUserNotebooks";

import {Note} from "@/types/Note";

interface Props {
    selectedNotes: Note[];
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    closeSidebar?: () => void;
}

const NotebooksAccordion: React.FC<Props> = ({ selectedNotes, addNote, removeNote, closeSidebar }) => {

    const { user } = useAuth();

    const { notebooks, loading } = useUserNotebooks(user?.id || "");

    const [openNotebooks, setOpenNotebooks] = React.useState<{[key: string]: boolean}>({});

    useEffect(() => {
        if(loading) return;
        setOpenNotebooks(notebooks.reduce((acc, notebook) => {
            return {
                ...acc,
                [notebook.id]: openNotebooks[notebook.id] ?? true
            }
        }, {}))
    }, [notebooks, loading])

    if(loading) return (
        <Skeleton
            h={'100px'}
        />
    );

    if(notebooks.length === 0) return (
        <VStack
            alignItems={'start'}
        >
            <Text
                fontSize={'lg'}
                fontWeight={'medium'}
            >
                No Notebooks
            </Text>
            <AddNotebookButton
                w={'100%'}
            />
        </VStack>
    )

    return (
        <Accordion
            allowMultiple
            w={'100%'}
            index={notebooks.reduce((acc, notebook, index) => {
                if(openNotebooks[notebook.id]) {
                    return [...acc, index]
                }
                return acc;
            }, [] as number[])}
            onChange={(index: number[]) => {
                setOpenNotebooks(notebooks.reduce((acc, notebook, i) => {
                    return {
                        ...acc,
                        [notebook.id]: index.includes(i)
                    }
                }, {}))
            }}
        >
            {
                notebooks.map((notebook) => (
                    <Notebook
                        key={notebook.id}
                        notebook={notebook}
                        selectedNotes={selectedNotes}
                        addNote={addNote}
                        removeNote={removeNote}
                        closeSidebar={closeSidebar}
                    />
                ))
            }
        </Accordion>
    );
};

export default NotebooksAccordion;
