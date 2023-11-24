import React from 'react';

import {Heading, Text, VStack} from "@chakra-ui/react";

import NotebookGrid from "@/components/Home/Explore/NotebookGrid";

import useNotebooks from "@/hooks/queries/useNotebooks";

import {TopNotebook} from "@/types/Notebook";

const PopularNotebooks = () => {

    const { notebooks, loading } = useNotebooks<TopNotebook>("top");

    return (
        <VStack
            spacing={4}
            align={'start'}
        >
            <Heading
                size={{
                    base: 'md',
                    md: 'lg'
                }}
            >
                Popular Notebooks
            </Heading>
            <NotebookGrid
                notebooks={notebooks}
                loading={loading}
                rightComponent={(index) => (
                    <VStack
                        justifyContent={'space-between'}
                        align={'end'}
                        h={'100%'}
                    >
                        <Text
                            fontWeight={'bold'}
                            color={index < 3 ? 'brand.500' : undefined}
                        >
                            #{index + 1}
                        </Text>
                        <Text>
                            {notebooks[index].totalScore} points
                        </Text>
                    </VStack>
                )
            }
            />
        </VStack>
    );
};

export default PopularNotebooks;
