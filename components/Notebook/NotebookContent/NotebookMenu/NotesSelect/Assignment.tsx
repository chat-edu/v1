import React from 'react';

import {HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {FaClipboardList, FaEllipsisH} from "react-icons/fa";

import DeleteButton from "@/components/Notebook/NotebookContent/NotebookMenu/NotesSelect/Buttons/DeleteButton";

import useDeleteAssignment from "@/hooks/mutators/delete/useDeleteAssignment";

import {useCurrentUser} from "@/contexts/CurrentUserContext";

import {Assignment} from "@/types/assignment/Assignment";

interface Props {
    assignment: Assignment,
    selectAssignment: () => void,
    selected: boolean
}

const Assignment: React.FC<Props> = ({ assignment, selectAssignment, selected }) => {

    const { isTeacher } = useCurrentUser();

    const { deleteAssignment } = useDeleteAssignment(assignment);

    const [isHovering, setIsHovering] = React.useState(false);

    return (
        <HStack
            w={'100%'}
            justifyContent={'space-between'}
            px={4}
            py={2}
            _hover={{
                bg: 'blackAlpha.50'
            }}
            cursor={'pointer'}
            transition={'background 0.2s ease-in-out'}
            rounded={'md'}
            onClick={selectAssignment}
            bg={selected ? 'blackAlpha.50' : 'transparent'}
            borderWidth={selected ? 2 : 0}
            borderColor={'brand.500'}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <HStack
                spacing={4}
            >
                <Icon
                    as={FaClipboardList}
                    height={'20px'}
                />
                <Text
                    textAlign={'left'}
                >
                    {assignment.name}
                </Text>
            </HStack>
            {
                isHovering && isTeacher && (
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
                            <MenuItem
                                p={0}
                            >
                                <DeleteButton
                                    onDelete={deleteAssignment}
                                    name={"Assignment"}
                                />
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )
            }
        </HStack>
    );
};

export default Assignment;
