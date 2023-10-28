import React from 'react';

import ReactMarkdown from "react-markdown";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";

import markdownTheme from "@/theme/markdownTheme";

interface Props {
    content: string
}

const Markdown: React.FC<Props> = ({ content }) => {
    return (
        <ReactMarkdown
            components={ChakraUIRenderer(markdownTheme)}
            className={'prose'}
            skipHtml
        >
            {content}
        </ReactMarkdown>
    );
};

export default Markdown;
