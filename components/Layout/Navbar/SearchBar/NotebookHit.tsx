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
            onClick={() => {
                console.log(`/notebooks/${notebookIndexRow.id}`)
            }}
        >
            <Box>
                <Text>
                    {notebookIndexRow.name}
                </Text>
            </Box>
        </Link>
    );
};

export default NotebookHit;
