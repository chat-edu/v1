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

import {Button, Card, Heading, HStack} from "@chakra-ui/react";

import "@/components/Utilities/Editor/editorContent.css";

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

    return (
        <Card
            w={'100%'}
            maxW={'100%'}
            p={4}
            gap={4}
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
                <Button
                    onClick={() => save(markdown)}
                    colorScheme={'brand'}
                    isDisabled={markdown === initialMarkdown}
                >
                    Save
                </Button>
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
                placeholder={'Start typing...'}
            />
        </Card>
    )
}

export default Editor