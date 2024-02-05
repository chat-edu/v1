import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookContent from "@/components/Notebook/NotebookContent";
import Loading from "@/components/Utilities/Loading";

import useNotebook from "@/hooks/queries/notebook/useNotebook";

import {Notebook as NotebookType} from "@/types/Notebook";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/queries/user/useUser";
import TeacherNotebook from "@/components/Notebook/TeacherNotebook";

interface Props {
    notebookId: NotebookType["id"],
    setOverviewMode?: () => void;
}

const Notebook: React.FC<Props> = ({ notebookId }) => {

    const { user } = useAuth();
    const { isTeacher } = useUser(user?.id || '');

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
