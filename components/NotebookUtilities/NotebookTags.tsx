import React from 'react';
import {Badge, HStack} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebookId: Notebook["id"]
}

const tags = [
    'Python',
    'Machine Learning',
]

const NotebookTags: React.FC<Props> = ({ notebookId }) => {
    return (
        <HStack>
            {
                tags.map(tag => (
                    <Badge
                        key={tag}
                        colorScheme={'brand'}
                        cursor={'pointer'}
                    >
                        {tag}
                    </Badge>
                ))
            }
        </HStack>
    );
};

export default NotebookTags;
