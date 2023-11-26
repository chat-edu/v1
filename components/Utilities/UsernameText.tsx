import React from 'react';

import {HStack, Image, Text, TextProps, Tooltip, useColorModeValue, VStack} from "@chakra-ui/react";

import {User} from "@/types/User";
import Link from "next/link";
import useUser from "@/hooks/queries/user/useUser";

interface Props extends TextProps {
    username: User['username']
    id: User['id']
}

const UsernameText: React.FC<Props> = ({ username, id,  ...rest }) => {

    const tooltipBg = useColorModeValue("brand.600", "brand.100");
    const hoverColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

    const onClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
    }

    return (
        <Tooltip
            label={<UsernameTooltip username={username} id={id} />}
            rounded={'md'}
            p={2}
            bg={tooltipBg}
        >
            <Link
                href={`/users/${id}`}
                style={{
                    wordBreak: 'break-word'
                }}
            >
                <Text
                    fontWeight={'semibold'}
                    p={1}
                    as={'span'}
                    _hover={{
                        bg: hoverColor
                    }}
                    {...rest}
                    onClick={onClick}
                    rounded={'md'}
                    cursor={'pointer'}
                    transition={'all 0.2s ease-in-out'}
                    fontSize={{
                        base: 'sm',
                        md: 'md'
                    }}
                >
                    @{username}
                </Text>
            </Link>
        </Tooltip>
    );
};

const UsernameTooltip: React.FC<Props> = ({ username, id }) => {

        const { userData, loading } = useUser(id);

        if(loading || !userData) {
            return (
                <Text>
                    Loading...
                </Text>
            )
        }

        return (
            <HStack>
                <Image
                    src={userData.profilePictureUrl}
                    boxSize={12}
                    alt={userData.username}
                />
                <VStack
                    alignItems={'flex-start'}
                    spacing={0}
                >
                    <Text
                        fontWeight={'bold'}
                        fontSize={'lg'}
                    >
                        {userData.name}
                    </Text>
                    <Text
                        opacity={0.75}
                        fontSize={'sm'}
                    >
                        @{username}
                    </Text>
                </VStack>
            </HStack>
        )
}

export default UsernameText;
