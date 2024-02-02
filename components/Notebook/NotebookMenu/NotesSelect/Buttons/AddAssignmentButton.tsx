import React from 'react';

import {useDisclosure} from "@chakra-ui/react";

import {MdAssignmentAdd} from "react-icons/md";

import TooltipIconButton from "@/components/Utilities/TooltipIconButton";
import AddAssignmentModal from "@/components/AddModals/AddAssignment";

import {Topic} from "@/types/Topic";

interface Props {
    topicId: Topic['id'],
}

const AddNoteButton: React.FC<Props> = ({topicId }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddAssignmentModal
                isOpen={isOpen}
                onClose={onClose}
                topicId={topicId}
            />
            <TooltipIconButton
                aria-label={'Add Assignment'}
                icon={<MdAssignmentAdd />}
                size={'xs'}
                onClick={onOpen}
            />
        </>
    );
};

export default AddNoteButton;
