import React, {useState} from 'react';

import {HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text,} from "@chakra-ui/react";

import {FaBookBookmark} from "react-icons/fa6";
import {FaEllipsisH} from "react-icons/fa";

import ChatWithNotesButton from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Buttons/ChatWithNotesButton";
import DeleteButton from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Buttons/DeleteButton";

import useDeleteNote from "@/hooks/mutators/delete/useDeleteNote";

import {Note as NoteType} from "@/types/Note";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/user/useUser";

interface Props {
    note: NoteType,
    onSelect: () => void,
    selected: boolean,
    selectNotes: (note: NoteType[]) => void,
}

const Note: React.FC<Props> = ({ note, onSelect, selected, selectNotes }) => {

    const { user } = useAuth();
    const { isTeacher } = useUser(user?.id || '')

    const [isHovering, setIsHovering] = useState(false);

    const { deleteNote } = useDeleteNote(note);

    return (
        <HStack
            w={'100%'}
            justifyContent={'flex-start'}
            onClick={onSelect}
            px={4}
            py={2}
            _hover={{
                bg: 'blackAlpha.50'
            }}
            cursor={'pointer'}
            transition={'background 0.2s ease-in-out'}
            rounded={'md'}
            borderWidth={selected ? 2 : 0}
            borderColor={'brand.500'}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <HStack
                w={'100%'}
                justifyContent={'space-between'}
                spacing={2}
            >
                <HStack
                    spacing={4}
                >
                    <Icon
                        as={FaBookBookmark}
                        height={'20px'}
                    />
                    <Text
                        textAlign={'left'}
                    >
                        {note.name}
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
                                        <MenuItem
                                            p={0}
                                        >
                                            <DeleteButton
                                                onDelete={deleteNote}
                                                name={"Note"}
                                            />
                                        </MenuItem>
                                    )
                                }
                                <MenuItem
                                    p={0}
                                >
                                    <ChatWithNotesButton
                                        onClick={() => selectNotes([note])}
                                    />
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )
                }
            </HStack>
        </HStack>
    );
};

export default Note;
