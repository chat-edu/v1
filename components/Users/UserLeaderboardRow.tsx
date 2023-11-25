import React from 'react';

import {UserScore} from "@/types/User";
import {Card, HStack, Image, Text, VStack} from "@chakra-ui/react";
import UsernameText from "@/components/Utilities/UsernameText";

interface Props {
    userScore: UserScore
}

const UserLeaderboardRow: React.FC<Props> = ({ userScore }) => {
    return (
        <Card
            w={'100%'}
        >
            <HStack
                w={'100%'}
                justifyContent={'space-between'}
            >
                <HStack
                    spacing={4}
                >
                    <Text>
                        #{userScore.rank}
                    </Text>
                    <Image
                        src={userScore.profilePictureUrl}
                        alt={userScore.username}
                        boxSize={'50px'}
                    />
                    <VStack
                        align={'start'}
                        spacing={1}
                    >
                        <Text
                            fontSize={'lg'}
                            fontWeight={'bold'}
                        >
                            {userScore.name}
                        </Text>
                        <UsernameText
                            id={userScore.id}
                            username={userScore.username}
                        />
                    </VStack>
                </HStack>
                <Text
                    fontSize={'lg'}
                >
                    Score: {userScore.score}
                </Text>
            </HStack>
        </Card>
    );
};

export default UserLeaderboardRow;
