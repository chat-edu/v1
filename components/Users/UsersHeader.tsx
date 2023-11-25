import React from 'react';
import PageHeader from "@/components/Utilities/PageHeader";

const UsersHeader = () => {
    return (
        <PageHeader
            imageSrc={'/logo.png'}
            imageAlt={'Edu Chat Logo'}
            heading={"Top Users"}
            subheading={"See who's on top of the leaderboard"}
        />
    );
};

export default UsersHeader;
