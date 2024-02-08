import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookContent from "@/components/Notebook/NotebookContent";
import Loading from "@/components/Utilities/Loading";
import TeacherNotebook from "@/components/Notebook/TeacherNotebook";

import useNotebook from "@/hooks/queries/notebook/useNotebook";

import {useCurrentUser} from "@/contexts/CurrentUserContext";

import {Notebook as NotebookType} from "@/types/Notebook";

interface Props {
    notebookId: NotebookType["id"],
    setOverviewMode?: () => void;
}

const Notebook: React.FC<Props> = ({ notebookId }) => {

    const { isTeacher } = useCurrentUser();

    const { notebook, loading } = useNotebook(notebookId);

    return (
        <Loading
            loading={loading}
            h={'100%'}
        >
            {
                notebook ? (
                    isTeacher ? (
                        <TeacherNotebook
                            notebook={notebook}
                        />
                    ) : (
                        <NotebookContent
                            notebook={notebook}
                        />
                    )
                ) : (
                    <Text>
                        Notebook not found
                    </Text>
                )
            }
        </Loading>
    )
};

export default Notebook;
