import React from 'react';
import {Text} from "@chakra-ui/react";
import useAuth from "@/hooks/useAuth";
import PageHeader from "@/components/Utilities/PageHeader";
import useUser from "@/hooks/queries/user/useUser";

const HomeHeader = () => {

    const { user } = useAuth();

    const { userData } = useUser(user?.id || "");

    return (
        <PageHeader
            imageSrc={'/logo.png'}
            imageAlt={'Edu Chat Logo'}
            heading={
                <>
                    <Text
                        as='span'
                    >
                        Welcome to Chat
                    </Text>
                    <Text
                        as='span'
                        color={'brand.500'}
                    >
                        EDU
                    </Text>
                    {
                        user && user.name && (
                            <Text
                                as='span'
                            >
                                , {user.name.split(' ')[0]}
                            </Text>
                        )
                    }

                </>
            }
            subheading={userData?.role === 'student' ? 'How are your classes going?' : 'See how your students are doing!'}
        />
    );
};

export default HomeHeader;
