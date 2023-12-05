import React from 'react';

import {Badge, HStack, Skeleton} from "@chakra-ui/react";

import useTags from "@/hooks/queries/tags/useTags";

import {Notebook} from "@/types/Notebook";
import {Tag, TagTypes} from "@/types/Tags";

interface Props {
    notebookId: Notebook["id"]
}



const NotebookTags: React.FC<Props> = ({ notebookId }) => {

    const { tags, loading } = useTags(notebookId);

    if(loading) return <Skeleton
        h={'20px'}
    />

    if(tags.length === 0) return null;

    return (
        <HStack
            flexWrap={'wrap'}
        >
            {
                tags.map((tag) => (
                    <Badge
                        key={tag.tagType.name}
                        colorScheme={getTagColorScheme(tag)}
                        cursor={'pointer'}
                    >
                        {tag.tag}
                    </Badge>
                ))
            }
        </HStack>
    );
};

const getTagColorScheme = (tag: Tag): string => {
    switch(tag.tagType.parentTagTypeName) {
        case TagTypes.SCHOOL:
            return "blue"
        case TagTypes.TOPIC:
            return "yellow"
        default:
            return "brand"
    }
}

export default NotebookTags;
