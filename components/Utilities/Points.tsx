import React from 'react';

import {Box, BoxProps, HStack, Icon, Text, useColorModeValue} from "@chakra-ui/react";

import {GiAcorn} from "react-icons/gi";

interface Props extends BoxProps {
    points: number,
}

const Points: React.FC<Props> = ({ points, ...rest }) => {

    const textBackground = useColorModeValue('brand.100', 'brand.900')

    return (
        <HStack
            rounded={'full'}
            spacing={0}
            px={2}
            py={0.5}
            align={'end'}
            flexDirection={'row-reverse'}
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
                    as={GiAcorn}
                />
            </Box>
        </HStack>
    );
};

export default Points;
