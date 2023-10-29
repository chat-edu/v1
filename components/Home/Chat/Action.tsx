import React from 'react';

import {Card, Heading, HStack, Icon, Text, useColorModeValue, VStack} from "@chakra-ui/react";

import {IconType} from "react-icons";
import {transparentize} from "@chakra-ui/theme-tools";

interface Props {
    label: string,
    description: string,
    icon: IconType
    onClick: () => void,
    disabled: boolean
}

const Action: React.FC<Props> = ({ label, description, icon, onClick, disabled }) => {

    const hoverColor = transparentize(useColorModeValue('brand.200', 'brand.700'), 0.5);
    const actionCardColor = useColorModeValue("white", "#2D2D2D");

    return (
        <Card
            bg={(actionCardColor)}
            flex={1}
            onClick={disabled ? undefined : onClick}
            cursor={disabled ? "not-allowed" : 'pointer'}
            p={4}
            _hover={disabled ? undefined : {
                boxShadow: 'lg',
                bg: hoverColor
            }}
            transition={'all 0.2s ease-in-out'}
            h={'100%'}
            opacity={disabled ? 0.8 : 1}
        >
            <HStack
                spacing={4}
                h={'100%'}
                alignItems={'center'}
            >
                <Icon
                    as={icon}
                    color={'brand.500'}
                    boxSize={10}
                />
                <VStack
                    align={'flex-start'}
                >
                    <Heading
                        size={'md'}
                    >
                        {label}
                    </Heading>
                    <Text
                        fontSize={'sm'}
                        opacity={0.7}
                    >
                        {description}
                    </Text>
                </VStack>
            </HStack>
        </Card>
    );
};

export default Action;
