import React from 'react';

import {Button, useDisclosure} from "@chakra-ui/react";

import AddTopicModal from "@/components/AddModals/AddTopic/AddTopicModal";

import {AddIcon} from "@chakra-ui/icons";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";
import TooltipIconButton from "@/components/Utilities/TooltipIconButton";

interface Props {
    notebookId: Notebook['id']
    parentTopicId?: Topic['id'],
    orderPosition: Topic['orderPosition'],
    icon?: boolean
}

const AddTopic: React.FC<Props> = ({ notebookId, parentTopicId, orderPosition, icon}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddTopicModal
                isOpen={isOpen}
                onClose={onClose}
                notebookId={notebookId}
                orderPosition={orderPosition}
                parentTopicId={parentTopicId}
            />
            {
                icon ? (
                    <TooltipIconButton
                        aria-label={'Add Topic'}
                        onClick={onOpen}
                        icon={<AddIcon />}
                        size={'xs'}
                    />
                ) : (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpen();
                        }}
                        leftIcon={<AddIcon />}
                        justifyContent={'flex-start'}
                        variant={'ghost'}
                        w={'100%'}
                    >
                        Add Topic
                    </Button>
                )
            }
        </>
    );
};

export default AddTopic;
