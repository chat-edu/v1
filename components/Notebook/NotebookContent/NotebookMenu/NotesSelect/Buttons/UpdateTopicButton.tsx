import React from 'react';

import {Button, useDisclosure} from "@chakra-ui/react";
import {FaEdit} from "react-icons/fa";

import EditTopicModal from "@/components/EditModal/EditTopic/EditTopicModal";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";

interface Props {
    notebookId: Notebook['id'];
    topicId: Topic["id"];
    topicName: Topic['name'];
}

const UpdateTopicButton: React.FC<Props> = ({ notebookId, topicId, topicName}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditTopicModal
                isOpen={isOpen}
                onClose={onClose}
                notebookId={notebookId}
                topicId={topicId}
                topicName={topicName}
            />
            <Button
                onClick={(e) => {
                    onOpen();
                    e.stopPropagation();
                }}
                leftIcon={<FaEdit />}
                justifyContent={'flex-start'}
                variant={'ghost'}
                w={'100%'}
            >
                Edit Topic
            </Button>
        </>

    );
};

export default UpdateTopicButton;
