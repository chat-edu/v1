import React from 'react';

import {Box, BoxProps, HStack, Icon, Text, Tooltip, useColorModeValue} from "@chakra-ui/react";

import {IconType} from "react-icons";

interface Props extends BoxProps {
    points: number,
    pointsType: string,
    icon: IconType,
    color?: string
}

const Points: React.FC<Props> = ({ points, pointsType, icon, color= 'brand', ...rest }) => {

    const textBackground = useColorModeValue(`${color}.100`, `${color}.900`);
    const tooltipBackground = useColorModeValue(`${color}.500`, `${color}.200`);

    return (
        <Tooltip
            label={`${pointsType} Score`}
            bg={tooltipBackground}
        >
            <HStack
                rounded={'full'}
                spacing={0}
                px={2}
                py={0.5}
                align={'end'}
                flexDirection={'row-reverse'}
                mr={-2}
            >
                <Text
                    pl={{
                        base: "14px",
                        md: "18px"
                    }}
                    pr={{
                        base: "6px",
                        md: "8px"
                    }}
                    py={0.5}
                    borderColor={`${color}.500`}
                    bg={textBackground}
                    borderWidth={{
                        base: 1,
                        md: 2,
                    }}
                    roundedRight={'md'}
                    lineHeight={1}
                    fontWeight={'bold'}
                    textAlign={'right'}
                    fontSize={{
                        base: 'sm',
                        md: 'md'
                    }}
                >
                    {(points * 171).toLocaleString()}
                </Text>
                <Box
                    rounded={'full'}
                    bg={`${color}.500`}
                    boxSize={{
                        base: 8,
                        md: 8,
                    }}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    color={'white'}
                    mr={{
                        base: -3,
                        md: -4,
                    }}
                    zIndex={1}
                    {...rest}
                >
                    <Icon
                        as={icon}
                    />
                </Box>
            </HStack>
        </Tooltip>
    );
};

export default Points;
