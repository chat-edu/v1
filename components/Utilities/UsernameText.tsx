import React from 'react';

import {Text, TextProps, useColorModeValue} from "@chakra-ui/react";

import {User} from "@/types/User";
import Link from "next/link";

interface Props extends TextProps {
    username: User['username']
    id: User['id']
}

const UsernameText: React.FC<Props> = ({ username, id,  ...rest }) => {

    const hoverColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

    const onClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
    }

    return (
        <Link href={`/user/${id}`}>
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
            >
                @{username}
            </Text>
        </Link>
    );
};

export default UsernameText;
