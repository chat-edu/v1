import React from 'react';

import {Heading, HStack, Stack} from "@chakra-ui/react";

import PageHeader from "@/components/Utilities/PageHeader";
import VerifiedCheckmark from "@/components/Utilities/VerifiedCheckmark";
import UserPoints from "@/components/Utilities/Points/UserPoints";
import NotebookPoints from "@/components/Utilities/Points/NotebookPoints";
import Loading from "@/components/Utilities/Loading";

import useCreatorScore from "@/hooks/queries/scores/users/useCreatorScore";
import useUserScore from "@/hooks/queries/scores/users/useUserScore";

import {User} from "@/types/User";

interface Props {
    user: User
}

const UserHeader: React.FC<Props> = ({ user }) => {

    const { creatorScore, loading: creatorScoreLoading } = useCreatorScore(user.id);
    const { userScore, loading: userScoreLoading } = useUserScore(user.id);

    return (
        <PageHeader
            imageSrc={user.profilePictureUrl}
            imageAlt={user.username}
            heading={
                <HStack>
                    <Heading>
                        {user.name}
                    </Heading>
                    {
                        user.verified && (
                            <VerifiedCheckmark
                                boxSize={{
                                    base: 6,
                                    md: 8
                                }}
                            />
                        )
                    }
                </HStack>
            }
            subheading={`@${user.username}`}
            rightComponent={
                <Loading
                    loading={creatorScoreLoading || userScoreLoading}
                    h={'60px'}
                    w={'100px'}
                >
                    <Stack
                        direction={{
                            base: 'row',
                            md: 'column'
                        }}
                        align={{
                            base: 'center',
                            md: 'end'
                        }}
                    >
                        <UserPoints
                            points={userScore?.score || 0}
                        />
                        <NotebookPoints
                            points={creatorScore?.score || 0}
                        />
                    </Stack>
                </Loading>
            }
        />
    )
};

export default UserHeader;
