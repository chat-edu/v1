import React from 'react';

import {HStack, Icon, Text,} from "@chakra-ui/react";

import {FaBookBookmark} from "react-icons/fa6";

import {Note as NoteType} from "@/types/Note";

interface Props {
    note: NoteType,
    onSelect: () => void,
    selected: boolean
}

const Note: React.FC<Props> = ({ note, onSelect, selected }) => {
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
        >
            <Icon
                as={FaBookBookmark}
                height={'20px'}
            />
            <Text>
                {note.name}
            </Text>
        </HStack>
    );
};

export default Note;
