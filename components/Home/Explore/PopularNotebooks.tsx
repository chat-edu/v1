import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import NotebookGrid from "@/components/Home/Explore/NotebookGrid";

import useNotebooks from "@/hooks/queries/notebooks/useNotebooks";

import {NotebookWithTotalScore} from "@/types/Notebook";

interface Props {
    onClick: (notebook: NotebookWithTotalScore) => void
}

const PopularNotebooks: React.FC<Props> = ({ onClick }) => {

    const { notebooks, loading } = useNotebooks<NotebookWithTotalScore>("top");

    return (
        <NotebookGrid
            heading={'Popular Notebooks'}
            notebooks={notebooks}
            loading={loading}
            onClick={onClick}
            rightComponent={(_, index) => (
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
                        Total Score: {notebooks[index].totalScore}
                    </Text>
                </VStack>
            )}
        />
    );
};

export default PopularNotebooks;
