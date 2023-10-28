import React from 'react';

import {VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";
import UploadNotes from "@/components/Home/UploadNotes";

const HomeLanding = () => {

    return (
        <VStack
            flex={1}
        >
            <Welcome />
            <UploadNotes />
        </VStack>
    );
};

export default HomeLanding;
