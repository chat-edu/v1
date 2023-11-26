export interface TagType {
    name: string,
    parentTagTypeName: string | null,
}

export interface NotebookTag {
    tag: string,
    tagType: TagType
}

export interface TagTypeRow {
    name: string,
    parent_tag_type_name: string | null,
}

export interface NotebookTagRow {
    notebook_id: number,
    tag: string,
    tag_type_name: string,
}

export interface NotebookTagWithParentTagTypeRow extends NotebookTagRow {
    parent_tag_type_name: string | null,
}
