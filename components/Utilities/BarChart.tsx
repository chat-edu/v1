import React from 'react';

import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

import {Box, useColorModeValue} from "@chakra-ui/react";

interface Props {
    height: number;
    width: string;
    data: any[];
    labelKey: string;
    valueKey: string;
}

const BarChart: React.FC<Props> = ({ height, width, data, labelKey, valueKey }) => {

    return (
        <Box
            w={width}
            h={`${height}px`}
        >
            <ResponsiveContainer
                width={"100%"}
            >
                <RechartsBarChart
                    height={height}
                    data={data}
                >
                    <XAxis
                        dataKey={labelKey}
                        stroke={useColorModeValue('#000000', '#FFFFFF')}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            backgroundColor: useColorModeValue('white', '#2D2D2D'),
                        }}
                        cursor={{
                            fill: useColorModeValue('#CCCCCC', '#424141'),
                        }}
                    />
                    <Bar
                        dataKey={valueKey}
                        fill="#4caf50"
                        radius={[8, 8, 0, 0]}
                    />
                </RechartsBarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default BarChart;
