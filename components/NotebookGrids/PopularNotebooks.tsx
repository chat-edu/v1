import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";

import useNotebooks from "@/hooks/queries/notebooks/useNotebooks";

import {RankedNotebook} from "@/types/Notebook";
import Medal from "@/components/Utilities/Medal";

interface Props {
    onClick: (notebook: RankedNotebook) => void
}

const PopularNotebooks: React.FC<Props> = ({ onClick }) => {

    const { notebooks, loading } = useNotebooks<RankedNotebook>("top");

    return (
        <NotebookGrid
            heading={'Popular Notebooks'}
            notebooks={notebooks}
            loading={loading}
            onClick={onClick}
            rightComponent={(notebook) => (
                <VStack
                    justifyContent={'space-between'}
                    align={'end'}
                    h={'100%'}
                >
                    <Medal rank={notebook.rank} />
                    {/*<Text*/}
                    {/*    fontWeight={'bold'}*/}
                    {/*    color={notebook.rank < 3 ? 'brand.500' : undefined}*/}
                    {/*    fontSize={{*/}
                    {/*        base: 'md',*/}
                    {/*        md: 'lg'*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    #{notebook.rank}*/}
                    {/*</Text>*/}
                    <Text
                        fontSize={{
                            base: 'sm',
                            md: 'md'
                        }}
                    >
                        Total Score: {notebook.totalScore}
                    </Text>
                </VStack>
            )}
        />
    );
};

export default PopularNotebooks;
