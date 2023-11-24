import React from 'react';

import Link from "next/link";

import ClickableCard from "@/components/Utilities/ClickableCard";

import {Badge, HStack, Text, VStack} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook,
    rank?: number
}

const tags = [
    'Python',
    'Machine Learning',
]

const NotebookCard: React.FC<Props> = ({ notebook, rank }) => {

    return (
        <Link
            href={`/notebook/${notebook.id}`}
            style={{
                width: '100%'
            }}
        >
            <ClickableCard
                onClick={() => {}}
                flex={1}
                w={'100%'}
            >
                <HStack
                    w={'100%'}
                    align={'start'}
                >
                    <VStack
                        flex={1}
                        align={'start'}
                    >
                        <HStack>
                            {
                                tags.map(tag => (
                                    <Badge
                                        key={tag}
                                        colorScheme={'brand'}
                                        cursor={'pointer'}
                                    >
                                        {tag}
                                    </Badge>
                                ))
                            }
                        </HStack>
                        <Text
                            fontWeight={'bold'}
                            fontSize={{
                                base: 'sm',
                                md: 'md'
                            }}
                            mb={0}
                        >
                            {notebook.name}
                        </Text>
                        <Text
                            fontSize={{
                                base: 'sm',
                                // md: 'md'
                            }}
                            opacity={0.7}
                        >
                            By {notebook.userName}
                        </Text>
                        <Text>
                            {notebook.numNotes} note{notebook.numNotes === 1 ? '' : 's'}
                        </Text>
                    </VStack>
                    {
                        rank && (
                            <Text
                                fontWeight={'bold'}
                                color={rank <= 3 ? 'brand.500' : undefined}
                            >
                                #{rank}
                            </Text>
                        )
                    }
                </HStack>
            </ClickableCard>
        </Link>
    );
};

export default NotebookCard;
