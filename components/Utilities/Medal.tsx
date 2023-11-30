import React from 'react';

import {Box, Icon, Text} from "@chakra-ui/react";

import {PiMedalLight} from "react-icons/pi";

interface Props {
    rank: number
}

const smBoxSize = '35px';
const mdBoxSize = '50px';

const smFontSize = '8px';
const mdFontSize = '12px';

const smTop = '7px';
const mdTop = '10px';

const Medal: React.FC<Props> = ({ rank }) => {

    if(rank > 3) return (
        <Text
            w={{
                base: smBoxSize,
                md: mdBoxSize
            }}
            textAlign={'center'}
            fontWeight={'semibold'}
        >
            {rank}
        </Text>
    )

    return (
        <Box
            position={'relative'}
            color={getRankColor(rank)}
        >
            <Icon
                as={PiMedalLight}
                boxSize={{
                    base: smBoxSize,
                    md: mdBoxSize
                }}
            />
            <Text
                position={'absolute'}
                top={{
                    base: smTop,
                    md: mdTop
                }}
                left='50%'
                transform={'translateX(-50%)'}
                fontSize={{
                    base: smFontSize,
                    md: mdFontSize
                }}
                fontWeight={'bold'}
            >
                {rank}
            </Text>
        </Box>
    );
};

const getRankColor = (rank: number) => {
    switch (rank) {
        case 1:
            return '#d4af37'
        case 2:
            return '#C0C0C0'
        case 3:
            return '#CD7F32'
        default:
            return undefined
    }
}

export default Medal;
