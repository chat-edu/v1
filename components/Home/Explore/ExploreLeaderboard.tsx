import React from 'react';

import SectionBlock from "@/components/Utilities/SectionBlock";
import UsersLeaderboard from "@/components/Users/UsersLeaderboard";
import {Button, VStack} from "@chakra-ui/react";
import Link from "next/link";

const ExploreLeaderboard = () => {
    return (
        <SectionBlock heading={'Leaderboard'}>
            <UsersLeaderboard
                limit={5}
            />
            <VStack
                w={'100%'}
            >
                <Link
                    href={'/users'}
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

export default ExploreLeaderboard;
