'use client';

import React from 'react';

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
    toolbarPlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import {Box, Button, Heading, HStack} from "@chakra-ui/react";
import {MdDocumentScanner} from "react-icons/md";
import {FaWandMagicSparkles} from "react-icons/fa6";

import "@/components/Utilities/Editor/editorContent.css";
import FileInput from "@/components/Utilities/FormUtilities/FIleInput";
import TooltipIconButton from "@/components/Utilities/TooltipIconButton";

import useEditor from "@/hooks/utilities/useEditor";

import {Note} from "@/types/Note";


interface Props {
    save: (markdown: string) => Promise<void>,
    note: Note,
}

const Editor: React.FC<Props> = ({ note, save }) => {

    const {
        ref,
        file,
        updateFile,
        processFile,
        isFileExtracting,
        markdown,
        setMarkdown,
        generateContent,
        isGeneratingContent
    } = useEditor(note);

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
                    <Button
                        onClick={generateContent}
                        colorScheme={'brand'}
                        variant={'outline'}
                        flexShrink={0}
                        leftIcon={<FaWandMagicSparkles />}
                        isLoading={isGeneratingContent}
                    >
                        Generate Notes
                    </Button>
                    {
                        file && (
                            <TooltipIconButton
                                aria-label={'Extract Text'}
                                onClick={processFile}
                                colorScheme={'brand'}
                                isLoading={isFileExtracting}
                                icon={<MdDocumentScanner />}
                            />
                        )
                    }
                    <Button
                        onClick={() => save(markdown)}
                        colorScheme={'brand'}
                        isDisabled={markdown === note.content}
                        flexShrink={0}
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
            />
        </Box>
    )
}

export default Editor