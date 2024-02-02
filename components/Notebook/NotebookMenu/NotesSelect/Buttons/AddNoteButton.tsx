import React from 'react';

import {MdNoteAdd} from "react-icons/md";

import TooltipIconButton from "@/components/Utilities/TooltipIconButton";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";
import AddNoteModal from "@/components/AddModals/AddNote/AddNoteModal";
import {useDisclosure} from "@chakra-ui/react";

interface Props {
    notebookId: Notebook['id']
    parentTopicId?: Topic['id'],
    orderPosition: Topic['orderPosition']
}

const AddNoteButton: React.FC<Props> = ({ notebookId, parentTopicId, orderPosition }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddNoteModal
                isOpen={isOpen}
                onClose={onClose}
                notebookId={notebookId}
                orderPosition={orderPosition}
                parentTopicId={parentTopicId}
            />
            <TooltipIconButton
                aria-label={'Add Lesson'}
                icon={<MdNoteAdd />}
                size={'xs'}
                onClick={onOpen}
            />
        </>
    );
};

export default AddNoteButton;
