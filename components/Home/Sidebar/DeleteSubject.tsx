import React, { useRef, useState } from 'react';

import { IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import useSubject from "@/hooks/mutators/useSubject";
import { Subject } from "@/types/Subject";

interface Props {
    subject: Subject
}

const DeleteSubject: React.FC<Props> = ({ subject }) => {
    
    const { deleteSubject } = useSubject(subject);

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef<HTMLButtonElement>(null);

    const handleDelete = () => {
        deleteSubject();
        onClose();
    };

    return (
        <>
            <IconButton
                aria-label={'Delete Course'}
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
                            Delete Course
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this course?
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

export default DeleteSubject;
