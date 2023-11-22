import React from 'react';

import {Container} from "@chakra-ui/react";

import YourNotebooks from "@/components/Home/Explore/YourNotebooks";
import PopularNotebooks from "@/components/Home/Explore/PopularNotebooks";

const Explore = () => {
    return (
        <Container
            maxW={'6xl'}
            py={{
                base: 4,
                md: 8
            }}
            display={'flex'}
            flexDir={'column'}
            gap={{
                base: 4,
                md: 8
            }}
        >
            <YourNotebooks />
            <PopularNotebooks />
        </Container>
    );
};

export default Explore;
