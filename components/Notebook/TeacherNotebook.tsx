import React from 'react';

import {Container} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";
import TeacherOverview from "@/components/Notebook/TeacherOverview";
import NotebookContent from "@/components/Notebook/NotebookContent";

interface Props {
    notebook: Notebook
}

enum Modes {
    OVERVIEW,
    CONTENT
}

const TeacherNotebook: React.FC<Props> = ({ notebook }) => {

    const [mode, setMode] = React.useState<Modes>(Modes.OVERVIEW);

    if(mode === Modes.CONTENT) return (
        <NotebookContent
            notebook={notebook}
            setOverviewMode={() => setMode(Modes.OVERVIEW)}
        />
    )

    return (
        <Container
            flex={1}
            w={'100%'}
            maxW={'6xl'}
            py={8}
        >
            <TeacherOverview
                notebook={notebook}
                setContentMode={() => setMode(Modes.CONTENT)}
            />
        </Container>
    );
};

export default TeacherNotebook;
