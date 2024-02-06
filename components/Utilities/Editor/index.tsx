'use client';

import React, {useEffect, useRef, useState} from 'react';

import {
    MDXEditor,
    codeBlockPlugin,
    headingsPlugin,
    listsPlugin,
    linkPlugin,
    quotePlugin,
    markdownShortcutPlugin,
    AdmonitionDirectiveDescriptor,
    codeMirrorPlugin,
    directivesPlugin,
    frontmatterPlugin,
    imagePlugin,
    KitchenSinkToolbar,
    linkDialogPlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin, MDXEditorMethods
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import {Box, Button, Heading, HStack, IconButton} from "@chakra-ui/react";

import "@/components/Utilities/Editor/editorContent.css";
import FileInput from "@/components/Utilities/FormUtilities/FIleInput";
import useProcessPdf from "@/hooks/utilities/useProcessPdf";
import TooltipIconButton from "@/components/Utilities/TooltipIconButton";
import {FaWandMagicSparkles} from "react-icons/fa6";

interface Props {
    initialMarkdown: string,
    save: (markdown: string) => Promise<void>,
}

const Editor: React.FC<Props> = ({ initialMarkdown, save }) => {

    const [markdown, setMarkdown] = useState<string>(initialMarkdown);

    const ref = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        if(ref.current) {
            ref.current.setMarkdown(initialMarkdown);
        }
    }, [initialMarkdown])

    const { file, updateFile, extractedText, processFile, resetFile, isFileExtracting } = useProcessPdf();

    useEffect(() => {
        console.log(extractedText)
        if(extractedText && ref.current) {
            ref.current.setMarkdown(ref.current.getMarkdown() + '\n\n' + extractedText);
        }
    }, [extractedText]);

    return (
        <Box
            w={'100%'}
            maxW={'100%'}
            p={4}
            gap={4}
            display={'flex'}
            flexDirection={'column'}
        >
            <HStack
                w={'100%'}
                justifyContent={'space-between'}
            >
                <Heading
                    size={'md'}
                >
                    Editor
                </Heading>
                <HStack>
                    <FileInput
                        setFile={updateFile}
                        text={file ? file.name : 'Upload PDF'}
                        accept={'.pdf'}
                    />
                    {
                        file && (
                            <TooltipIconButton
                                aria-label={'Extract Text'}
                                onClick={processFile}
                                colorScheme={'brand'}
                                isLoading={isFileExtracting}
                                icon={<FaWandMagicSparkles />}
                            />
                        )
                    }
                    <Button
                        onClick={() => save(markdown)}
                        colorScheme={'brand'}
                        isDisabled={markdown === initialMarkdown}
                    >
                        Save
                    </Button>
                </HStack>
            </HStack>
            <MDXEditor
                markdown={markdown}
                ref={ref}
                onChange={setMarkdown}
                plugins={[
                    listsPlugin(),
                    quotePlugin(),
                    headingsPlugin(),
                    linkPlugin(),
                    linkDialogPlugin(),
                    imagePlugin({ imageUploadHandler: async () => '/sample-image.png' }),
                    tablePlugin(),
                    thematicBreakPlugin(),
                    frontmatterPlugin(),
                    codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
                    directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                    markdownShortcutPlugin(),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <KitchenSinkToolbar />
                        )
                    })
                ]}
                contentEditableClassName={'editor-content'}
                // placeholder={'Start typing...'}
            />
        </Box>
    )
}

export default Editor