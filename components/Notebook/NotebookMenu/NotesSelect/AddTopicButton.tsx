import React from 'react';

import TooltipIconButton from "@/components/Utilities/TooltipIconButton";
import AddTopicModal from "@/components/AddModals/AddTopic/AddTopicModal";

import {AddIcon} from "@chakra-ui/icons";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";
import {useDisclosure} from "@chakra-ui/react";

interface Props {
    notebookId: Notebook['id']
    parentTopicId?: Topic['id'],
    orderPosition: Topic['orderPosition']
}

const AddTopic: React.FC<Props> = ({ notebookId, parentTopicId, orderPosition}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <TooltipIconButton
                aria-label={'Add Topic'}
                icon={<AddIcon />}
                size={'xs'}
                onClick={onOpen}
            />
            <AddTopicModal
                isOpen={isOpen}
                onClose={onClose}
                notebookId={notebookId}
                orderPosition={orderPosition}
                parentTopicId={parentTopicId}
            />
        </>
    );
};

export default AddTopic;
