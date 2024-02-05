import React from 'react';

import {Card, HStack, Icon, Text, VStack} from "@chakra-ui/react";

import {FaChalkboardTeacher} from "react-icons/fa";
import {Notebook} from "@/types/Notebook";
import NotebookSummary from "@/components/Notebook/TeacherOverview/NotebookOverview/NotebookSummary";

interface Props {
    notebookId: Notebook["id"]
}


const NotebookOverview: React.FC<Props> = ({ notebookId }) => {
    return (
        <Card
            variant={'outline'}
            w={'100%'}
            gap={4}
        >
            <HStack
                spacing={4}
                w={'100%'}
            >
                <Icon
                    as={FaChalkboardTeacher}
                    boxSize={'36px'}
                    color={'brand.500'}
                />
                <VStack
                    align={'flex-start'}
                >
                    <Text
                        fontSize={'xl'}
                        fontWeight={'bold'}
                        lineHeight={1}
                    >
                        Classroom Overview
                    </Text>
                    <Text>
                        Get a holistic view of your classroom&apos;s strengths and knowledge gaps.
                    </Text>
                </VStack>
            </HStack>
            <NotebookSummary
                notebookId={notebookId}
            />
        </Card>
    );
};

export default NotebookOverview;
