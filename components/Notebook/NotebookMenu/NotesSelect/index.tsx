import React, {useMemo} from 'react';

import {
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react";

import Topic from "@/components/Notebook/NotebookMenu/NotesSelect/Topic";
import Loading from "@/components/Utilities/Loading";
import AddTopicButton from "@/components/Notebook/NotebookMenu/NotesSelect/Buttons/AddTopicButton";

import useNotes from "@/hooks/queries/notes/useNotes";
import useTopics from "@/hooks/queries/topics/useTopics";

import {generateHierarchy} from "@/services/topics";

import {Notebook as NotebookType} from "@/types/Notebook";
import {Note as NoteType} from "@/types/Note";
import {Assignment} from "@/types/assignment/Assignment";

interface Props {
    notebook: NotebookType,
    selectedLesson: NoteType | null,
    selectLesson: (note: NoteType) => void
    deselectLesson: (id: NoteType["id"]) => void,
    selectedNotes: NoteType[],
    selectNotes: (notes: NoteType[]) => void,
    selectedAssignment: Assignment | null,
    selectAssignment: (assignment: Assignment) => void
}

const NotesSelect: React.FC<Props> = ({ notebook, selectLesson,  selectedLesson, deselectLesson, selectedNotes, selectNotes, selectedAssignment, selectAssignment }) => {

    const { notes, loading: notesLoading } = useNotes(notebook.id);
    const { topics, loading: topicsLoading } = useTopics(notebook.id);

    const topicHierarchy = useMemo(() => {
        if(topicsLoading && notesLoading) return [];
        return generateHierarchy(topics, notes, null);
    }, [topicsLoading, notesLoading, topics, notes]);

    return (
        <VStack
            align={'start'}
            spacing={2}
        >
            <HStack
                w={'100%'}
                justifyContent={'space-between'}
            >
                <Text
                    fontWeight={'bold'}
                >
                    Topics
                </Text>
                <AddTopicButton
                    notebookId={notebook.id}
                    orderPosition={topics.length}
                    icon
                />
            </HStack>
            <Loading
                loading={notesLoading || topicsLoading}
            >
                {
                    <VStack
                        w={'100%'}
                        align={'start'}
                        mb={2}
                        wordBreak={'break-word'}
                        spacing={0}
                    >
                        {
                            topicHierarchy.length > 0 ? (
                                topicHierarchy.map((topic) => (
                                    <Topic
                                        key={topic.id}
                                        topicHierarchy={topic}
                                        selectedLesson={selectedLesson}
                                        selectLesson={selectLesson}
                                        deselectLesson={deselectLesson}
                                        selectedNotes={selectedNotes}
                                        selectNotes={selectNotes}
                                        selectedAssignment={selectedAssignment}
                                        selectAssignment={selectAssignment}
                                    />
                                ))
                            ) : (
                                <Text>
                                    No notes found
                                </Text>
                            )
                        }
                    </VStack>
                }
            </Loading>
        </VStack>
    );
};

export default NotesSelect;
