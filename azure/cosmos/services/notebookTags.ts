import { find, del, add, update } from '@/azure/cosmos/services/base';

import { NOTEBOOK_TAGS_TABLE } from "@/azure/cosmos/constants/tables";

import { NotebookTag, NotebookTagRow, NotebookTagWithParentTagTypeRow} from "@/types/Tags";

// CREATE

export const addNotebookTag = async (notebookTag: NotebookTagRow): Promise<NotebookTagRow | null> => {
    return add(NOTEBOOK_TAGS_TABLE, notebookTag);
};

// READ

// find all tags for a notebook, get the parent_tag_type
export const findNotebookTagsByNotebookId = async (notebookId: number): Promise<NotebookTag[]> => {
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
    return find(query, [notebookId], transformNotebookTagWithParentTagType);
}

// UPDATE

export const updateNotebookTag = async (
    notebookId: number,
    tagTypeName: string,
    updatedFields: Partial<NotebookTagRow>
): Promise<NotebookTagRow | null> => {
    return update<Partial<NotebookTagRow>, NotebookTagRow>(
        NOTEBOOK_TAGS_TABLE,
        [notebookId, tagTypeName],
        updatedFields,
        ['notebook_id', 'tag_type_name']
    );
}

// DELETE

export const deleteNotebookTag = async (notebookId: number, tagTypeName: string) => {
    return del(NOTEBOOK_TAGS_TABLE, [notebookId, tagTypeName], ['notebook_id', 'tag_type_name']);
};

// TRANSFORMERS

const transformNotebookTagWithParentTagType = (row: NotebookTagWithParentTagTypeRow): NotebookTag => ({
    tag: row.tag,
    tagType: {
        name: row.tag_type_name,
        parentTagTypeName: row.parent_tag_type_name,
    },
});