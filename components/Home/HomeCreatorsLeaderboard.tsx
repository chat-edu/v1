import React from 'react';

import {Button, VStack} from "@chakra-ui/react";

import Link from "next/link";

import SectionBlock from "@/components/Utilities/SectionBlock";
import CreatorLeaderboard from "@/components/Creators/CreatorLeaderboard";

const HomeUsersLeaderboard = () => {
    return (
        <SectionBlock heading={'Top Creators'}>
            <CreatorLeaderboard
                limit={5}
            />
            <VStack
                w={'100%'}
            >
                <Link
                    href={'/creators'}
                >
                    <Button
                        variant={'ghost'}
                        colorScheme={'brand'}
                    >
                        See More
                    </Button>
                </Link>
            </VStack>
        </SectionBlock>
    );
};

export default HomeUsersLeaderboard;
