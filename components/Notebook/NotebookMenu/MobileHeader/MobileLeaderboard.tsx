import React from 'react';

import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    useDisclosure
} from "@chakra-ui/react";
import {FaTrophy} from "react-icons/fa";

import NotebookMenuHeader from "@/components/Notebook/NotebookMenu/NotebookMenuHeader";
import NotebookLeaderboard from "@/components/NotebookUtilities/NotebookLeaderboard";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook,
}

const MobileLeaderboard: React.FC<Props> = ({ notebook }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label={'Open Leaderboard'}
                icon={<FaTrophy />}
                onClick={onOpen}
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                size={'full'}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <NotebookMenuHeader
                            notebook={notebook}
                        />
                    </DrawerHeader>
                    <DrawerBody>
                        <Box
                            flex={1}
                            w={'100%'}
                        >
                            <NotebookLeaderboard
                                notebookId={notebook.id}
                            />
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button
                            variant='outline'
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MobileLeaderboard;
