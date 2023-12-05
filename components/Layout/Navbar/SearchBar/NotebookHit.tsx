import React from 'react';

import Link from "next/link";

import {Box, Text} from "@chakra-ui/react";

import {NotebookIndexRow} from "@/search/types/NotebookIndex";

interface Props {
    notebookIndexRow: NotebookIndexRow
}

const NotebookHit: React.FC<Props> = ({ notebookIndexRow }) => {
    return (
        <Link
            href={`/notebooks/${notebookIndexRow.id}`}
            style={{
                width: '100%',
            }}
        >
            <Box
                w={'100%'}
            >
                <Text
                    width={'100%'}
                >
                    {notebookIndexRow.name}
                </Text>
            </Box>
        </Link>
    );
};

export default NotebookHit;
