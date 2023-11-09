import React from 'react';

import {Card, HStack, Icon, Text, useColorModeValue, VStack} from "@chakra-ui/react";

import {IconType} from "react-icons";

interface Props {
    label: string,
    icon: IconType
    onClick: () => void,
    disabled: boolean
}

const Action: React.FC<Props> = ({ label, icon, onClick, disabled }) => {

    const hoverColor = useColorModeValue('#cde6ce', '#30542c');
    const actionCardColor = useColorModeValue("white", "#2D2D2D");

    return (
        <Card
            bg={(actionCardColor)}
            flex={1}
            onClick={disabled ? undefined : onClick}
            cursor={disabled ? "not-allowed" : 'pointer'}
            p={{
                base: 2,
                md: 4
            }}
            _hover={disabled ? undefined : {
                boxShadow: 'lg',
                bg: hoverColor
            }}
            transition={'all 0.2s ease-in-out'}
            h={'100%'}
            borderColor={'brand.500'}
            borderWidth={2}
        >
            <HStack
                spacing={4}
                h={'100%'}
                alignItems={'center'}
            >
                <Icon
                    as={icon}
                    color={'brand.500'}
                    display={{
                        base: 'none',
                        md: 'block'
                    }}
                    boxSize={6}
                />
                <VStack
                    align={'flex-start'}
                >
                    <Text
                        fontSize={{
                            base: '2xs',
                            md: 'md'
                        }}
                        fontWeight={'bold'}
                    >
                        {label}
                    </Text>
                </VStack>
            </HStack>
        </Card>
    );
};

export default Action;
