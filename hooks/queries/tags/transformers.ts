import {TagWithParentTagTypeRow} from "@/cosmosPostgres/types/tag";

import {Tag} from "@/types/Tags";

export const transformTag = (row: TagWithParentTagTypeRow): Tag => ({
    tag: row.tag,
    tagType: {
        name: row.tag_type_name,
        parentTagTypeName: row.parent_tag_type_name,
    },
});