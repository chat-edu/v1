import React from 'react';

import {Box, SimpleGrid} from "@chakra-ui/react";

import HomeHeader from "@/components/Home/HomeHeader";
import Container from "@/components/Utilities/Container";

const StudentHome = () => {
    return (
        <Box>
            <Container>
                <HomeHeader />
                <SimpleGrid>
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default StudentHome;
