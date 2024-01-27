import React from 'react';

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HStack,
    Text
} from "@chakra-ui/react";

import Note from "@/components/Notebook/NotebookMenu/NotesSelect/Note";
import AddNoteButton from "@/components/Notebook/NotebookMenu/NotesSelect/AddNoteButton";
import AddTopicButton from "@/components/Notebook/NotebookMenu/NotesSelect/AddTopicButton";

import {TopicHierarchy} from "@/types/Topic";
import {Note as NoteType} from "@/types/Note";

interface Props {
    topicHierarchy: TopicHierarchy,
    selectLesson: (note: NoteType) => void
    deselectLesson: (id: NoteType["id"]) => void,
    selectedLesson: NoteType | null,
}

const Topic: React.FC<Props> = ({ topicHierarchy, selectedLesson, selectLesson, deselectLesson}) => {

    const [isHovering, setIsHovering] = React.useState(false);

    return (
        <Accordion
            allowToggle
            w={'100%'}
        >
            <AccordionItem
                borderWidth={0}
            >
                <h2>
                    <AccordionButton
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <HStack
                            w={'100%'}
                            justifyContent={'space-between'}
                        >
                            <HStack>
                                <AccordionIcon />
                                <Text>
                                    {topicHierarchy.name}
                                </Text>
                            </HStack>
                            {
                                isHovering && (
                                    <HStack>
                                        <AddNoteButton
                                            notebookId={topicHierarchy.notebookId}
                                            parentTopicId={topicHierarchy.id}
                                            orderPosition={topicHierarchy.notes.length}
                                        />
                                        <AddTopicButton
                                            notebookId={topicHierarchy.notebookId}
                                            parentTopicId={topicHierarchy.id}
                                            orderPosition={topicHierarchy.subTopics.length}
                                        />
                                    </HStack>
                                )
                            }
                        </HStack>
                    </AccordionButton>
                </h2>
                <AccordionPanel
                    pr={0}
                    pb={0}
                >
                    {
                        topicHierarchy.subTopics.map((subTopic) => (
                            <Topic
                                key={subTopic.id}
                                topicHierarchy={subTopic}
                                selectLesson={selectLesson}
                                deselectLesson={deselectLesson}
                                selectedLesson={selectedLesson}
                            />
                        ))
                    }
                    {
                        topicHierarchy.notes.map((note) => (
                            <Note
                                key={note.id}
                                note={note}
                                onSelect={() => selectLesson(note)}
                                selected={selectedLesson?.id === note.id}
                            />
                        ))
                    }
                    {
                        topicHierarchy.subTopics.length === 0 && topicHierarchy.notes.length === 0 && (
                            <Text>
                                No Content Yet
                            </Text>
                        )
                    }
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default Topic;
