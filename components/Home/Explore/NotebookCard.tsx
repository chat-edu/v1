import React from 'react';

import Link from "next/link";

import ClickableCard from "@/components/Utilities/ClickableCard";

import {Badge, HStack, Progress, Text, VStack} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook
}

const tags = [
    'Python',
    'Machine Learning',
]

const NotebookCard: React.FC<Props> = ({ notebook }) => {

    const [progress] = React.useState(Math.floor(Math.random() * 100));

    const [score] = React.useState(Math.floor(Math.random() * 8));

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
                <VStack
                    align={'start'}
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
                                By Mink ZaZa
                            </Text>
                        </VStack>
                        <Text>
                            #{score}
                        </Text>
                    </HStack>
                    <HStack
                        w={'100%'}
                    >
                        <Progress
                            value={progress}
                            w={'100%'}
                            colorScheme={'brand'}
                        />
                        <Text
                            fontSize={'xs'}
                        >
                            {progress}%
                        </Text>
                    </HStack>
                </VStack>
            </ClickableCard>
        </Link>
    );
};

export default NotebookCard;
