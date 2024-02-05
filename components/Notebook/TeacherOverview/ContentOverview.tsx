import React, {useMemo} from 'react';

import {HStack, Icon, Skeleton, Text, VStack} from "@chakra-ui/react";

import ClickableCard from "@/components/Utilities/ClickableCard";
import {PiGraphBold} from "react-icons/pi";

import useTopics from "@/hooks/queries/topics/useTopics";
import useNotes from "@/hooks/queries/notes/useNotes";

import {generateHierarchy} from "@/services/topics";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebookId: Notebook['id'];
    setContentMode: () => void;
}

const ContentOverview: React.FC<Props> = ({ notebookId, setContentMode }) => {

    return (
        <ClickableCard
            onClick={setContentMode}
            w={'100%'}
            p={4}
            variant={'outline'}
            gap={4}
        >
            <HStack>
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
            </HStack>
        </ClickableCard>
    );
};

export default ContentOverview;
