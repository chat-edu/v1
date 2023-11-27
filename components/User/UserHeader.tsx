import React from 'react';

import PageHeader from "@/components/Utilities/PageHeader";

import {User} from "@/types/User";
import {Heading, HStack} from "@chakra-ui/react";
import VerifiedCheckmark from "@/components/Utilities/VerifiedCheckmark";

interface Props {
    user: User
}

const UserHeader: React.FC<Props> = ({ user }) => {
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
        />
    )
};

export default UserHeader;
