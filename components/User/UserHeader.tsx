import React from 'react';

import PageHeader from "@/components/Utilities/PageHeader";

import {User} from "@/types/User";

interface Props {
    user: User
}

const UserHeader: React.FC<Props> = ({ user }) => {
    return (
        <PageHeader
            imageSrc={user.profilePictureUrl}
            imageAlt={user.username}
            heading={user.name}
            subheading={`@${user.username}`}
        />
    )
};

export default UserHeader;
