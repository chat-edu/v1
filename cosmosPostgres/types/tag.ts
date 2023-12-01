import {NotebookRow} from "@/cosmosPostgres/types/notebook";

// returned from the database when querying for a tag's type
export interface TagTypeRow {
    name: string,
    parent_tag_type_name: string | null,
}

// returned from the database when querying for a tag on a notebook
export interface TagRow {
    notebook_id: NotebookRow["id"],
    tag: string,
    tag_type_name: string,
}

// returned from the database when querying for a tag on a notebook and its type's parent tag type
export interface TagWithParentTagTypeRow extends TagRow {
    parent_tag_type_name: string | null,
}