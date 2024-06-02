import React from 'react';

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";
import NotebookPoints from "@/components/Utilities/Points/NotebookPoints";

import useUserNotebooks from "@/hooks/queries/scores/notebooks/useUserNotebooks";

import {NotebookScore} from "@/types/score";

interface Props {
    onClick: (notebook: NotebookScore) => void
}

const FeaturedNotebooks: React.FC<Props> = ({ onClick }) => {

    const { notebooks, loading } = useUserNotebooks("116059457699821363282");

    return (
        <NotebookGrid
            heading={'Featured Courses'}
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

export default FeaturedNotebooks;
