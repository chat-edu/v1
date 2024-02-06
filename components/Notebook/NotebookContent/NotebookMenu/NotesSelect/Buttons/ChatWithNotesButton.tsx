import React from 'react';

import {Button} from "@chakra-ui/react";

import {MdChatBubble} from "react-icons/md";

interface Props {
    onClick: () => void;
}

const ChatWithNotesButton: React.FC<Props> = ({ onClick }) => {
    return (
        <Button
            onClick={(e) => {
                onClick();
                e.stopPropagation();
            }}
            leftIcon={<MdChatBubble />}
            justifyContent={'flex-start'}
            variant={'ghost'}
            w={'100%'}
        >
            Ask Questions
        </Button>
    );
};

export default ChatWithNotesButton;
