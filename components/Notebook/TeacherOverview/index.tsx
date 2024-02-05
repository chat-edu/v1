import React from 'react';

import {Notebook} from "@/types/Notebook";
import {VStack} from "@chakra-ui/react";
import NotebookHeader from "@/components/Notebook/TeacherOverview/NotebookHeader";
import NotebookOverview from "@/components/Notebook/TeacherOverview/NotebookOverview";
import StudentsOverview from "@/components/Notebook/TeacherOverview/StudentsOverview";
import ContentOverview from "@/components/Notebook/TeacherOverview/ContentOverview";

interface Props {
    notebook: Notebook,
    setContentMode: () => void;
}

const TeacherOverview: React.FC<Props> = ({ notebook, setContentMode }) => {
    return (
        <VStack
            w={'100%'}
            spacing={8}
            alignItems={'flex-start'}
        >
            <NotebookHeader
                notebook={notebook}
            />
            <NotebookOverview
                notebookId={notebook.id}
            />
            <StudentsOverview
                notebookId={notebook.id}
            />
            <ContentOverview
                notebookId={notebook.id}
                setContentMode={setContentMode}
            />
        </VStack>
    );
};

export default TeacherOverview;
