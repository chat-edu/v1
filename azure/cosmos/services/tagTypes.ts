import { get, add, update, find, del } from '@/azure/cosmos/services/base';

import { TAG_TYPES_TABLE } from "@/azure/cosmos/constants/tables";

import { TagType, TagTypeRow} from "@/types/Tags";

// CREATE

export const addTagType = async (tagType: TagTypeRow): Promise<TagTypeRow | null> => {
    return add<TagTypeRow, TagTypeRow>(TAG_TYPES_TABLE, tagType);
};

// READ

export const getTagType = async (name: string): Promise<TagType | null> => {
    const query = 'SELECT * FROM TagTypes WHERE name = $1;';
    return get(query, [name], transformTagType);
};

export const findTagTypesByParent = async (parentTagTypeName: string): Promise<TagType[]> => {
    const query = 'SELECT * FROM TagTypes WHERE parent_type_name = $1;';
    return find(query, [parentTagTypeName], transformTagType);
}

export const findTagTypesWithNoParent = async (): Promise<TagType[]> => {
    const query = 'SELECT * FROM TagTypes WHERE parent_type_name IS NULL;';
    return find(query, [], transformTagType);
}

// UPDATE

export const updateTagType = async (name: string, updatedFields: Partial<TagType>): Promise<boolean> => {
    return update<Partial<TagType>, TagTypeRow>(TAG_TYPES_TABLE, [name], updatedFields);
};

// DELETE

export const deleteTagType = async (name: string): Promise<boolean> => {
    return del(TAG_TYPES_TABLE, [name]);
};

// TRANSFORMERS

const transformTagType = (row: TagTypeRow): TagType => ({
    name: row.name,
    parentTagTypeName: row.parent_tag_type_name,
});