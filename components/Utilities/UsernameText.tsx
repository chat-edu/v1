import React from 'react';

import {HStack, Image, Text, TextProps, Tooltip, useColorModeValue, VStack} from "@chakra-ui/react";

import {User} from "@/types/User";
import Link from "next/link";
import useUser from "@/hooks/queries/user/useUser";
import VerifiedCheckmark from "@/components/Utilities/VerifiedCheckmark";

interface Props extends TextProps {
    username: User['username']
    id: User['id']
    verified: boolean
}

const UsernameText: React.FC<Props> = ({ username, id, verified,  ...rest }) => {

    const hoverColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

    const onClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
    }

    return (
        <HStack
            spacing={1}
        >
            <Tooltip
                label={
                    <UsernameTooltip
                        username={username}
                        id={id}
                        verified={verified}
                    />
                }
            >
                <Link
                    href={`/users/${id}`}
                    style={{
                        wordBreak: 'break-word',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        fontWeight={'semibold'}
                        px={0.5}
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
            {
                verified && (
                    <VerifiedCheckmark />
                )
            }
        </HStack>
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
