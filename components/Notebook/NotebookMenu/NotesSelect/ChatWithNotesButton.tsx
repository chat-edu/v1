import React from 'react';

import TooltipIconButton from "@/components/Utilities/TooltipIconButton";

import {MdChatBubble} from "react-icons/md";

interface Props {
    onClick: () => void;
}

const ChatWithNotesButton: React.FC<Props> = ({ onClick }) => {
    return (
        <TooltipIconButton
            aria-label={'Chat with Notes'}
            icon={<MdChatBubble />}
            size={'xs'}
            onClick={onClick}
        />
    );
};

export default ChatWithNotesButton;
