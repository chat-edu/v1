import React, {useMemo} from 'react';

import {
    CheckboxGroup,
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react";

import Topic from "@/components/Notebook/NotebookMenu/NotesSelect/Topic";
import Loading from "@/components/Utilities/Loading";
import AddTopicButton from "@/components/Notebook/NotebookMenu/NotesSelect/AddTopicButton";

import useNotes from "@/hooks/queries/notes/useNotes";
import useTopics from "@/hooks/queries/topics/useTopics";

import {generateHierarchy} from "@/services/topics";

import {Notebook as NotebookType} from "@/types/Notebook";
import {Note as NoteType} from "@/types/Note";

interface Props {
    notebook: NotebookType,
    selectedLesson: NoteType | null,
    selectLesson: (note: NoteType) => void
    deselectLesson: (id: NoteType["id"]) => void,
}

const NotesSelect: React.FC<Props> = ({ notebook, selectLesson,  selectedLesson, deselectLesson }) => {

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
                    orderPosition={topicHierarchy.length}
                />
            </HStack>
            <Loading
                loading={notesLoading || topicsLoading}
            >
                {
                    <CheckboxGroup colorScheme='brand'>
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
                                        />
                                    ))
                                ) : (
                                    <Text>
                                        No notes found
                                    </Text>
                                )
                            }
                        </VStack>
                    </CheckboxGroup>
                }
            </Loading>
        </VStack>
    );
};

export default NotesSelect;
