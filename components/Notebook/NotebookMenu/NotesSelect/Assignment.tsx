import React from 'react';

import {HStack, Icon, Text} from "@chakra-ui/react";
import {FaClipboardList} from "react-icons/fa";

import {Assignment} from "@/types/assignment/Assignment";
import DeleteButton from "@/components/Notebook/NotebookMenu/NotesSelect/Buttons/DeleteButton";
import useDeleteAssignment from "@/hooks/mutators/delete/useDeleteAssignment";

interface Props {
    assignment: Assignment,
    selectAssignment: () => void,
    selected: boolean
}

const Assignment: React.FC<Props> = ({ assignment, selectAssignment, selected }) => {

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
                <Text>
                    {assignment.name}
                </Text>
            </HStack>
            {
                isHovering && (
                    <DeleteButton
                        onDelete={deleteAssignment}
                        name={"Assignment"}
                    />
                )
            }
        </HStack>
    );
};

export default Assignment;
