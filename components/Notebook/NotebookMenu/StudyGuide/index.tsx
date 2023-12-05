import React from 'react';

import {CgNotes} from "react-icons/cg";
import {Button, useDisclosure} from "@chakra-ui/react";

import StudyGuideModal from "@/components/Notebook/NotebookMenu/StudyGuide/StudyGuideModal";

import useStudyGuide from "@/hooks/useStudyGuide";

import {Note} from "@/types/Note";

interface Props {
    notes: Note[]
}

const StudyGuide: React.FC<Props> = ({ notes }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { messages, generateStudyGuide, isLoading } = useStudyGuide(notes);

    const onClick = () => {
        if (messages.length === 0) {
            generateStudyGuide();
        }
        onOpen();
    }

    return (
        <>
            <Button
                w={'100%'}
                leftIcon={<CgNotes />}
                onClick={onClick}
            >
                Create Study Guide
            </Button>
            <StudyGuideModal
                isOpen={isOpen}
                onClose={onClose}
                messages={messages}
                regenerate={generateStudyGuide}
                isLoading={isLoading}
            />
        </>
    );
};

export default StudyGuide;
