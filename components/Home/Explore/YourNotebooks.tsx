import React from 'react';

import {Heading, HStack, Text, VStack} from "@chakra-ui/react";

import AddNotebookButton from "@/components/Home/AddNotebook/AddNotebookButton";
import NotebookGrid from "@/components/Home/Explore/NotebookGrid";

import useUserNotebooks from "@/hooks/queries/useUserNotebooks";
import useAuth from "@/hooks/useAuth";

const YourNotebooks = () => {

    const { user } = useAuth();

    const { notebooks, loading } = useUserNotebooks(user?.id || "");

    return (
        <VStack
            spacing={4}
            align={'start'}
        >
            <HStack
                w={'100%'}
                justify={'space-between'}
            >
                <Heading
                    size={'lg'}
                >
                    Your Notebooks
                </Heading>
                <AddNotebookButton />
            </HStack>
            <NotebookGrid
                notebooks={notebooks}
                loading={loading}
                noNotebooksComponent={
                    <VStack>
                        <Text>
                            {"You don't have any notebooks yet"}
                        </Text>
                        <AddNotebookButton />
                    </VStack>
                }
            />
        </VStack>
    );
};

export default YourNotebooks;
