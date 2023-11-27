import React from 'react';

import {UserScore} from "@/types/User";
import {Card, HStack, Image, Text, VStack} from "@chakra-ui/react";
import UsernameText from "@/components/Utilities/UsernameText";
import Medal from "@/components/Utilities/Medal";
import useAuth from "@/hooks/useAuth";

interface Props {
    userScore: UserScore
}

const UserLeaderboardRow: React.FC<Props> = ({ userScore }) => {

    const { user } = useAuth();

    return (
        <Card
            w={'100%'}
            borderWidth={userScore.id === user?.id ? 2 : 0}
            borderColor={'brand.500'}
        >
            <HStack
                w={'100%'}
                justifyContent={'space-between'}
            >
                <HStack
                    spacing={{
                        base: 2,
                        md: 4
                    }}
                >
                    <Medal rank={userScore.rank} />
                    <Image
                        src={userScore.profilePictureUrl}
                        alt={userScore.username}
                        boxSize={{
                            base: '40px',
                            md: '50px'
                        }}
                    />
                    <VStack
                        align={'start'}
                        spacing={0}
                    >
                        <Text
                            fontSize={{
                                base: 'sm',
                                md: 'lg'
                            }}
                            fontWeight={'bold'}
                        >
                            {userScore.name}
                        </Text>
                        <UsernameText
                            id={userScore.id}
                            username={userScore.username}
                            verified={userScore.verified}
                            opacity={0.75}
                        />
                    </VStack>
                </HStack>
                <Text
                    fontSize={{
                        base: 'sm',
                        md: 'lg'
                    }}
                >
                    Score: {userScore.score}
                </Text>
            </HStack>
        </Card>
    );
};

export default UserLeaderboardRow;
