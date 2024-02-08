import React from 'react';

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList,
    Text, VStack
} from "@chakra-ui/react";
import {FaEllipsisH} from "react-icons/fa";

import AddNoteButton from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Buttons/AddNoteButton";
import AddTopicButton from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Buttons/AddTopicButton";
import AddAssignmentButton from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Buttons/AddAssignmentButton";
import ChatWithNotesButton from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Buttons/ChatWithNotesButton";
import Note from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Note";
import Assignment from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Assignment";
import DeleteButton from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Buttons/DeleteButton";
import UpdateTopicButton from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Buttons/UpdateTopicButton";

import useAssignments from "@/hooks/queries/assignment/useAssignments";
import useDeleteTopic from "@/hooks/mutators/delete/useDeleteTopic";

import {useCurrentUser} from "@/contexts/CurrentUserContext";

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

    const { isTeacher } = useCurrentUser();

    const [isHovering, setIsHovering] = React.useState(false);

    const { assignments, loading } = useAssignments(topicHierarchy.id);

    const { deleteTopic } = useDeleteTopic(topicHierarchy);

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
                                <Text
                                    textAlign={'left'}
                                >
                                    {topicHierarchy.name}
                                </Text>
                            </HStack>
                            {
                                isHovering && (
                                    <Menu>
                                        <MenuButton
                                            as={IconButton}
                                            icon={
                                                <Icon
                                                    as={FaEllipsisH}
                                                />
                                            }
                                            p={0}
                                            m={0}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            size={'xs'}
                                        />
                                        <MenuList>
                                            {
                                                isTeacher && (
                                                    <>
                                                        <MenuItem
                                                            p={0}
                                                        >
                                                            <AddNoteButton
                                                                notebookId={topicHierarchy.notebookId}
                                                                parentTopicId={topicHierarchy.id}
                                                                orderPosition={topicHierarchy.notes.length}
                                                            />
                                                        </MenuItem>
                                                        <MenuItem
                                                            p={0}
                                                        >
                                                            <AddTopicButton
                                                                notebookId={topicHierarchy.notebookId}
                                                                parentTopicId={topicHierarchy.id}
                                                                orderPosition={topicHierarchy.subTopics.length}
                                                            />
                                                        </MenuItem>
                                                        <MenuItem
                                                            p={0}
                                                        >
                                                            <AddAssignmentButton
                                                                topicId={topicHierarchy.id}
                                                            />
                                                        </MenuItem>
                                                        <MenuItem
                                                            p={0}
                                                        >
                                                            <UpdateTopicButton
                                                                notebookId={topicHierarchy.notebookId}
                                                                topicId={topicHierarchy.id}
                                                                topicName={topicHierarchy.name}
                                                            />
                                                        </MenuItem>
                                                        <MenuItem
                                                            p={0}
                                                        >
                                                            <DeleteButton
                                                                onDelete={deleteTopic}
                                                                name={"Topic"}
                                                            />
                                                        </MenuItem>
                                                    </>
                                                )
                                            }
                                            <MenuItem
                                                p={0}
                                            >
                                                <ChatWithNotesButton
                                                    onClick={() => selectNotes(topicHierarchy.notes)}
                                                />
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                )
                            }
                        </HStack>
                    </AccordionButton>
                </h2>
                <AccordionPanel
                    pr={0}
                    py={2}
                >
                    <VStack
                        align={'start'}
                    >
                        {
                            topicHierarchy.subTopics.length > 0 && (
                                <>
                                    <Text
                                        fontWeight={'semibold'}
                                        fontSize={'sm'}
                                        pl={4}
                                    >
                                        Sub Topics
                                    </Text>
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
                                </>
                            )
                        }
                        {
                            topicHierarchy.notes.length > 0 && (
                                <>
                                    <Text
                                        fontWeight={'semibold'}
                                        fontSize={'sm'}
                                        pl={4}
                                    >
                                        Lessons
                                    </Text>
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
                                </>
                            )
                        }
                        {
                            assignments.length > 0 && (
                                <>
                                    <Text
                                        fontWeight={'semibold'}
                                        fontSize={'sm'}
                                        pl={4}
                                    >
                                        Assignments
                                    </Text>
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
                                </>
                            )
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
