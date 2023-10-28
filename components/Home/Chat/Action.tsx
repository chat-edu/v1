import React from 'react';

import {Card, Heading, HStack, Icon, Text, useColorModeValue, VStack} from "@chakra-ui/react";

import {IconType} from "react-icons";
import {transparentize} from "@chakra-ui/theme-tools";

interface Props {
    label: string,
    description: string,
    icon: IconType
    onClick: () => void
}

const Action: React.FC<Props> = ({ label, description, icon, onClick }) => {

    const hoverColor = transparentize(useColorModeValue('brand.200', 'brand.700'), 0.5);

    return (
        <Card
            flex={1}
            onClick={onClick}
            cursor={'pointer'}
            p={4}
            _hover={{
                boxShadow: 'lg',
                bg: hoverColor
            }}
            transition={'all 0.2s ease-in-out'}
            h={'100%'}
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
