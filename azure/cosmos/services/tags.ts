import {find, del, add, update, get} from '@/azure/cosmos/services/base';

import { NOTEBOOK_TAGS_TABLE } from "@/azure/cosmos/constants/tables";

import {TagRow, TagTypeRow} from "@/azure/cosmos/types/tag";
import {NotebookRow} from "@/azure/cosmos/types";


// CREATE

export const addTag = async (notebookTag: TagRow): Promise<TagRow | null> => {
    return add(NOTEBOOK_TAGS_TABLE, notebookTag);
};

// READ

export const getTag = async (notebookId: NotebookRow["id"], tagTypeName: TagTypeRow["name"]): Promise<TagRow | null> => {
    const query = `
        SELECT
            nt.tag,
            tt.name AS tag_type_name,
            tt.parent_type_name AS parent_tag_type_name
        FROM NotebookTags nt
        JOIN TagTypes tt ON nt.tag_type_name = tt.name
        WHERE nt.notebook_id = $1 AND nt.tag_type_name = $2;
    `;
    return get(query, [notebookId, tagTypeName]);
}

// find all tags for a notebook, get the parent_tag_type
export const findTagsByNotebookId = async (notebookId: number): Promise<TagRow[]> => {
    const query = `
        SELECT
            nt.notebook_id,
            nt.tag,
            tt.name AS tag_type_name,
            tt.parent_type_name AS parent_tag_type_name
        FROM NotebookTags nt
        JOIN TagTypes tt ON nt.tag_type_name = tt.name
        WHERE nt.notebook_id = $1;
    `;
    return find(query, [notebookId]);
}

// UPDATE

export const updateTag = async (
    notebookId: number,
    tagTypeName: string,
    updatedFields: Partial<TagRow>
): Promise<boolean> => {
    return update<Partial<TagRow>, TagRow>(
        NOTEBOOK_TAGS_TABLE,
        [notebookId, tagTypeName],
        updatedFields,
        ['notebook_id', 'tag_type_name']
    );
}

// DELETE

export const deleteTag = async (notebookId: number, tagTypeName: string) => {
    return del(NOTEBOOK_TAGS_TABLE, [notebookId, tagTypeName], ['notebook_id', 'tag_type_name']);
};

// TRANSFORMERS