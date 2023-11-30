import {NotebookIdParams} from "@/app/api/tags/notebook/[notebookId]/NotebookIdParams";

export interface TagTypeParams extends NotebookIdParams {
    tagType: string
}