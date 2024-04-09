import React from 'react';

import {Button, Card, HStack, Icon, Text, VStack} from "@chakra-ui/react";

import {PiGraphBold} from "react-icons/pi";

import NotebookKnowledgeGraph from "@/components/Notebook/TeacherOverview/NotebookKnowledgeGraph";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebookId: Notebook['id'];
    setContentMode: () => void;
}

const ContentOverview: React.FC<Props> = ({ notebookId, setContentMode }) => {

    return (
        <Card
            w={'100%'}
            p={4}
            variant={'outline'}
            gap={4}
        >
            <HStack
                w={'100%'}
                mb={4}
            >
                <Icon
                    as={PiGraphBold}
                    boxSize={'36px'}
                    color={'brand.500'}
                />
                <VStack
                    alignItems={'flex-start'}
                >
                    <Text
                        fontSize={'xl'}
                        fontWeight={'bold'}
                        lineHeight={1}
                    >
                        Class Content
                    </Text>
                    <Text>
                        Create and manage topics, lessons, and assignments for your class.
                    </Text>
                </VStack>
                <Button
                    colorScheme={'brand'}
                    onClick={setContentMode}
                    ml={'auto'}
                    size={'sm'}
                >
                    Edit Content
                </Button>
            </HStack>
            <NotebookKnowledgeGraph
                notebookId={notebookId}
            />
        </Card>
    );
};

export default ContentOverview;
