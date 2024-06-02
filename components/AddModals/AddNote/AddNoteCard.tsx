import React from 'react';

import {Card, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {transparentize} from "@chakra-ui/theme-tools";

import AddNoteModal from "@/components/AddModals/AddNote/AddNoteModal";

interface Props {
    notebookId: number
}

const AddNoteCard: React.FC<Props> = ({ notebookId }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const hoverBackground = transparentize(useColorModeValue('brand.50', 'brand.200'), 0.25);

    return (
        <>
            <Card
                cursor={'pointer'}
                _hover={{
                    bg: hoverBackground
                }}
                onClick={onOpen}
                transition={'all 0.2s ease-in-out'}
                borderWidth={{
                    base: 1,
                    md: 2
                }}
                borderColor={'brand.400'}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={4}
            >
                <AddIcon
                    boxSize={6}
                />
                <Text
                    fontWeight={'bold'}
                    fontSize={{
                        base: 'md',
                        md: 'lg'
                    }}
                >
                    Add Content
                </Text>
            </Card>
            <AddNoteModal
                isOpen={isOpen}
                onClose={onClose}
                notebookId={notebookId}
            />
        </>
    );
};

export default AddNoteCard;
