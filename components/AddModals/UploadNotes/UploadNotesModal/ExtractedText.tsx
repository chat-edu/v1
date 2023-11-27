import React from 'react';

import Markdown from "@/components/Utilities/Markdown";

interface Props {
    text: string;
}

const ExtractedText: React.FC<Props> = ({ text }) => {
    return (
        <Markdown>
            {text}
        </Markdown>
    );
};

export default ExtractedText;
