import React from 'react';

import {Heading, HStack, Image, Text, VStack} from "@chakra-ui/react";

import {User} from "@/types/User";

interface Props {
    user: User
}

const UserHeader: React.FC<Props> = ({ user }) => {
    return (
        <HStack
            spacing={4}
            w={'100%'}
        >
            <Image
                src={`https://api.multiavatar.com/${user.id}.png`}
                boxSize={'100px'}
                alt={user.username}
                rounded={'full'}
            />
            <VStack
                align={'flex-start'}
            >
                <Heading
                    size={'lg'}
                >
                    {user.name}
                </Heading>
                <Text
                    fontSize={'lg'}
                >
                    @{user.username}
                </Text>
            </VStack>
        </HStack>
    );
};

export default UserHeader;
