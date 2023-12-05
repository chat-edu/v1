import React from 'react';

import Link from "next/link";

import {HStack, Image, Text, VStack} from "@chakra-ui/react";

import {UserIndexRow} from "@/search/types/UserIndex";

interface Props {
    userIndexRow: UserIndexRow
}

const UserHit: React.FC<Props> = ({ userIndexRow }) => {
    return (
        <Link href={`/users/${userIndexRow.id}`}>
            <HStack
                spacing={4}
            >
                <Image
                    src={userIndexRow.profile_picture_url}
                    alt={userIndexRow.username}
                    boxSize={8}
                />
                <VStack
                    align={'flex-start'}
                    spacing={0}
                >
                    <Text
                        fontWeight={'bold'}
                    >
                        {userIndexRow.name}
                    </Text>
                    <Text>
                        @{userIndexRow.username}
                    </Text>
                </VStack>
            </HStack>
        </Link>
    );
};

export default UserHit;
