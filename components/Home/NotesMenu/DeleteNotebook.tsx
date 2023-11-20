import React, { useRef, useState } from 'react';

import { IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import useNotebook from "@/hooks/mutators/useNotebook";

import { Notebook } from "@/types/Notebook";

interface Props {
    notebook: Notebook
}

const DeleteNotebook: React.FC<Props> = ({ notebook }) => {

    const { deleteNotebook } = useNotebook(notebook);

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);

    const handleDelete = () => {
        deleteNotebook();
        onClose();
    };

    return (
        <>
            <IconButton
                aria-label={'Delete Notebook'}
                icon={<SmallCloseIcon />}
                onClick={() => setIsOpen(true)}
                colorScheme={'red'}
                variant={'ghost'}
            />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Notebook
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this notebook?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteNotebook;
