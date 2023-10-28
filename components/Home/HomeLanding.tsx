import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";
import UploadNotes from "@/components/Home/UploadNotes";
import AddSubjectButton from "@/components/Home/AddSubject/AddSubjectButton";

import useSubjects from "@/hooks/queries/useSubjects";
import {BiUpload} from "react-icons/bi";

const HomeLanding = () => {

    const { subjects } = useSubjects();

    return (
        <VStack
            flex={1}
            spacing={4}
        >
            <Welcome />
            <Text>
                {
                    subjects.length > 0 ? (
                        'Select or upload notes to get started'
                    ) : (
                        'Add a subject to get started'
                    )
                }
            </Text>
            {
                subjects.length > 0 ? (
                    <UploadNotes
                        text={'Upload Notes'}
                        icon={<BiUpload />}
                    />
                ) : (
                    <AddSubjectButton />
                )
            }
        </VStack>
    );
};

export default HomeLanding;
