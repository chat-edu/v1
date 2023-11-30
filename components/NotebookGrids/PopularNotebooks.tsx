import React from 'react';


import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";
import NotebookPoints from "@/components/Utilities/Points/NotebookPoints";

import useTopNotebooks from "@/hooks/queries/scores/notebooks/useTopNotebooks";

import {RankedNotebookScore} from "@/types/score";

interface Props {
    onClick: (notebook: RankedNotebookScore) => void
}

const PopularNotebooks: React.FC<Props> = ({ onClick }) => {

    const { notebooks, loading } = useTopNotebooks(6);

    return (
        <NotebookGrid
            heading={'Popular Notebooks'}
            notebooks={notebooks}
            loading={loading}
            onClick={onClick}
            rightComponent={(notebook) => (
                <NotebookPoints
                    points={notebook.score}
                />
            )}
        />
    );
};

export default PopularNotebooks;
