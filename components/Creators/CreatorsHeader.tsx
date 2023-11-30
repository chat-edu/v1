import React from 'react';
import PageHeader from "@/components/Utilities/PageHeader";

const CreatorsHeader = () => {
    return (
        <PageHeader
            imageSrc={'/logo.png'}
            imageAlt={'Edu Chat Logo'}
            heading={"Top Creators"}
            subheading={"See who's created the most popular notebooks"}
        />
    );
};

export default CreatorsHeader;
