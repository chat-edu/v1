import React from 'react';

import SectionBlock from "@/components/Utilities/SectionBlock";
import UserScoreLeaderboard from "@/components/Users/UserScoreLeaderboard";
import {Button, VStack} from "@chakra-ui/react";
import Link from "next/link";

const HomeUsersLeaderboard = () => {
    return (
        <SectionBlock heading={'Leaderboard'}>
            <UserScoreLeaderboard
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

export default HomeUsersLeaderboard;
