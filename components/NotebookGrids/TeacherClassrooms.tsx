import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";

import useAuth from "@/hooks/useAuth";
import useTeacherNotebooks from "@/hooks/queries/notebook/useTeacherNotebooks";

const TeacherClassrooms = () => {

    const { user } = useAuth();

    const { notebooks, loading } = useTeacherNotebooks(user?.id || "");

    return (
        <NotebookGrid
            heading={'Your Classrooms'}
            notebooks={notebooks}
            loading={loading}
            onClick={() => {}}
            noNotebooksComponent={
                <Text>
                    {"You don't have any classrooms yet"}
                </Text>
            }
            addNotebook
            authGate
        />
    );
};

export default TeacherClassrooms;
