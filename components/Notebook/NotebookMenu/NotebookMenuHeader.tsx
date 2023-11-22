import React from 'react';

import {Heading, HStack} from "@chakra-ui/react";

import DeleteNotebook from "@/components/Home/NotesMenu/DeleteNotebook";

import {Notebook} from "@/types/Notebook";
import useAuth from "@/hooks/useAuth";

interface Props {
    notebook: Notebook
}

const NotebookMenuHeader: React.FC<Props> = ({ notebook }) => {

    const { user } = useAuth();

    return (
        <HStack
            w={'100%'}
            justifyContent={'space-between'}
        >
            <Heading
                size={'md'}
            >
                {notebook.name}
            </Heading>
            {
                user && user.id === notebook.userId && (
                    <DeleteNotebook
                        notebook={notebook}
                    />
                )
            }
        </HStack>
    );
};

export default NotebookMenuHeader;
