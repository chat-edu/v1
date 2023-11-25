import React from 'react';

import {Card, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

import AddNotebookModal from "@/components/Home/AddNotebook/AddNotebookModal";
import {transparentize} from "@chakra-ui/theme-tools";

const AddNotebookCard = () => {

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
                borderWidth={3}
                borderColor={'brand.400'}
                h={'100%'}
                w={'100%'}
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
                    fontSize={'xl'}
                >
                    Add Notebook
                </Text>
            </Card>
            <AddNotebookModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default AddNotebookCard;
