import React from 'react';

import {Text} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";

import useAuth from "@/hooks/useAuth";
import useEnrolledNotebooks from "@/hooks/queries/notebook/useEnrolledNotebooks";

const StudentClassrooms = () => {

    const { user } = useAuth();

    const { notebooks, loading } = useEnrolledNotebooks(user?.id || "");

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

export default StudentClassrooms;
