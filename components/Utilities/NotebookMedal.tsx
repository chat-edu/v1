import React from 'react';

import {Box, Icon, Text} from "@chakra-ui/react";

import {SlNotebook} from "react-icons/sl";

interface Props {
    rank: number
}

const smBoxSize = '30px';
const mdBoxSize = '40px';

const smFontSize = '10px';
const mdFontSize = '16px';

const smLeft = '12.25px';
const mdLeft = '15.25px';

const NotebookMedal: React.FC<Props> = ({ rank }) => {

    if(rank > 3) return (
        <Text
            w={{
                base: smBoxSize,
                md: mdBoxSize
            }}
            textAlign={'right'}
        >
            #{rank}
        </Text>
    )

    return (
        <Box
            position={'relative'}
            color={getRankColor(rank)}
        >
            <Icon
                as={SlNotebook}
                boxSize={{
                    base: smBoxSize,
                    md: mdBoxSize
                }}
            />
            <Text
                position={'absolute'}
                top='45%'
                transform={'translateY(-50%)'}
                left={{
                    base: smLeft,
                    md: mdLeft
                }}
                fontSize={{
                    base: smFontSize,
                    md: mdFontSize
                }}
                fontWeight={'bold'}
                textAlign={'center'}
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

export default NotebookMedal;
