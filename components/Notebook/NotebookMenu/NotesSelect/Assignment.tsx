import React from 'react';

import {HStack, Icon, Text} from "@chakra-ui/react";
import {FaClipboardList} from "react-icons/fa";

import {Assignment} from "@/types/assignment/Assignment";

interface Props {
    assignment: Assignment,
    selectAssignment: () => void,
}

const Assignment: React.FC<Props> = ({ assignment, selectAssignment }) => {
    return (
        <HStack
            w={'100%'}
            justifyContent={'flex-start'}
            spacing={4}
            px={4}
            py={2}
            _hover={{
                bg: 'blackAlpha.50'
            }}
            cursor={'pointer'}
            transition={'background 0.2s ease-in-out'}
            rounded={'md'}
            onClick={selectAssignment}
        >
            <Icon
                as={FaClipboardList}
                height={'20px'}
            />
            <Text>
                {assignment.name}
            </Text>
        </HStack>
    );
};

export default Assignment;
