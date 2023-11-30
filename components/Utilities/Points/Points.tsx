import React from 'react';

import {Box, BoxProps, HStack, Icon, Text, Tooltip, useColorModeValue} from "@chakra-ui/react";

import {IconType} from "react-icons";

interface Props extends BoxProps {
    points: number,
    pointsType: string,
    icon: IconType
}

const Points: React.FC<Props> = ({ points, pointsType, icon, ...rest }) => {

    const textBackground = useColorModeValue('brand.100', 'brand.900')

    return (
        <Tooltip
            label={`${pointsType} Score`}
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
                    pl={"18px"}
                    pr={"8px"}
                    py={0.5}
                    borderColor={'brand.500'}
                    bg={textBackground}
                    borderWidth={2}
                    roundedRight={'md'}
                    lineHeight={1}
                    fontWeight={'bold'}
                    textAlign={'right'}
                >
                    {points}
                </Text>
                <Box
                    rounded={'full'}
                    bg={'brand.500'}
                    boxSize={8}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    color={'white'}
                    mr={-4}
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
