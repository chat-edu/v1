import React from 'react';

import {VStack} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";
import Points from "@/components/Utilities/Points";

import useNotebooks from "@/hooks/queries/notebooks/useNotebooks";

import {RankedNotebook} from "@/types/Notebook";

interface Props {
    onClick: (notebook: RankedNotebook) => void
}

const PopularNotebooks: React.FC<Props> = ({ onClick }) => {

    const { notebooks, loading } = useNotebooks<RankedNotebook>("top?limit=6");

    return (
        <NotebookGrid
            heading={'Popular Notebooks'}
            notebooks={notebooks}
            loading={loading}
            onClick={onClick}
            rightComponent={(notebook) => (
                <VStack
                    justifyContent={'end'}
                    align={'end'}
                    h={'100%'}
                >
                    {/*<NotebookMedal*/}
                    {/*    rank={notebook.rank}*/}
                    {/*/>*/}
                    <Points
                        points={notebook.totalScore}
                    />
                </VStack>
            )}
        />
    );
};

export default PopularNotebooks;
