import React from 'react';

import ReactMarkdown from "react-markdown";

import ChakraUIRenderer from "chakra-ui-markdown-renderer";

import markdownTheme from "@/theme/markdownTheme";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';

interface Props {
    children: string
}

const Markdown: React.FC<Props> = ({ children }) => {
    return (
        <ReactMarkdown
            components={ChakraUIRenderer(markdownTheme)}
            className={'prose'}
            skipHtml
            remarkPlugins={[remarkMath]}
            // @ts-ignore
            rehypePlugins={[rehypeKatex]}
        >
            {children}
        </ReactMarkdown>
    );
};

export default Markdown;
