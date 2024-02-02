import React from 'react';

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HStack,
    Text, VStack
} from "@chakra-ui/react";

import Note from "@/components/Notebook/NotebookMenu/NotesSelect/Note";
import AddNoteButton from "@/components/Notebook/NotebookMenu/NotesSelect/AddNoteButton";
import AddTopicButton from "@/components/Notebook/NotebookMenu/NotesSelect/AddTopicButton";

import {TopicHierarchy} from "@/types/Topic";
import {Note as NoteType} from "@/types/Note";
import ChatWithNotesButton from "@/components/Notebook/NotebookMenu/NotesSelect/ChatWithNotesButton";
import useAssignments from "@/hooks/queries/assignment/useAssignments";
import Assignment from "@/components/Notebook/NotebookMenu/NotesSelect/Assignment";
import AddAssignmentButton from "@/components/Notebook/NotebookMenu/NotesSelect/AddAssignmentButton";

interface Props {
    topicHierarchy: TopicHierarchy,
    selectLesson: (note: NoteType) => void
    deselectLesson: (id: NoteType["id"]) => void,
    selectedLesson: NoteType | null,
    selectNotes: (notes: NoteType[]) => void,
    selectAssignment: (assignment: Assignment) => void
}

const Topic: React.FC<Props> = ({ topicHierarchy, selectedLesson, selectLesson, deselectLesson, selectNotes, selectAssignment }) => {

    const [isHovering, setIsHovering] = React.useState(false);

    const { assignments, loading } = useAssignments(topicHierarchy.id);

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
                        rounded={'md'}
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
                                        <AddAssignmentButton
                                            topicId={topicHierarchy.id}
                                        />
                                        <ChatWithNotesButton
                                            onClick={() => selectNotes(topicHierarchy.notes)}
                                        />
                                    </HStack>
                                )
                            }
                        </HStack>
                    </AccordionButton>
                </h2>
                <AccordionPanel
                    pr={0}
                    py={2}
                >
                    <VStack>
                    {
                        topicHierarchy.subTopics.map((subTopic) => (
                            <Topic
                                key={subTopic.id}
                                topicHierarchy={subTopic}
                                selectLesson={selectLesson}
                                deselectLesson={deselectLesson}
                                selectedLesson={selectedLesson}
                                selectNotes={selectNotes}
                                selectAssignment={selectAssignment}
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
                                selectNotes={selectNotes}
                            />
                        ))
                    }
                    {
                        !loading && assignments.map((assignment) => (
                            <Assignment
                                key={assignment.id}
                                assignment={assignment}
                                selectAssignment={() => selectAssignment(assignment)}
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
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default Topic;
