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

import AddNoteButton from "@/components/Notebook/NotebookMenu/NotesSelect/Buttons/AddNoteButton";
import AddTopicButton from "@/components/Notebook/NotebookMenu/NotesSelect/Buttons/AddTopicButton";
import AddAssignmentButton from "@/components/Notebook/NotebookMenu/NotesSelect/Buttons/AddAssignmentButton";
import ChatWithNotesButton from "@/components/Notebook/NotebookMenu/NotesSelect/Buttons/ChatWithNotesButton";
import Note from "@/components/Notebook/NotebookMenu/NotesSelect/Note";
import Assignment from "@/components/Notebook/NotebookMenu/NotesSelect/Assignment";
import DeleteButton from "@/components/Notebook/NotebookMenu/NotesSelect/Buttons/DeleteButton";

import useAssignments from "@/hooks/queries/assignment/useAssignments";
import useDeleteTopic from "@/hooks/mutators/delete/useDeleteTopic";

import {TopicHierarchy} from "@/types/Topic";
import {Note as NoteType} from "@/types/Note";

interface Props {
    topicHierarchy: TopicHierarchy,
    selectLesson: (note: NoteType) => void
    deselectLesson: (id: NoteType["id"]) => void,
    selectedLesson: NoteType | null,
    selectedNotes: NoteType[],
    selectNotes: (notes: NoteType[]) => void,
    selectedAssignment: Assignment | null,
    selectAssignment: (assignment: Assignment) => void
}

const Topic: React.FC<Props> = ({ topicHierarchy, selectedLesson, selectedNotes, selectLesson, deselectLesson, selectNotes, selectedAssignment, selectAssignment }) => {

    const [isHovering, setIsHovering] = React.useState(false);

    const { assignments, loading } = useAssignments(topicHierarchy.id);

    const { deleteTopic } = useDeleteTopic(topicHierarchy);

    console.log(topicHierarchy);

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
                                        <DeleteButton
                                            onDelete={deleteTopic}
                                            name={"Topic"}
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
                                selectedNotes={selectedNotes}
                                deselectLesson={deselectLesson}
                                selectedLesson={selectedLesson}
                                selectNotes={selectNotes}
                                selectedAssignment={selectedAssignment}
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
                                selected={selectedLesson?.id === note.id || selectedNotes.some((selectedNote) => selectedNote.id === note.id)}
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
                                selected={selectedAssignment?.id === assignment.id}
                            />
                        ))
                    }
                    {
                        topicHierarchy.subTopics.length === 0 && topicHierarchy.notes.length === 0 && assignments.length === 0 && (
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
