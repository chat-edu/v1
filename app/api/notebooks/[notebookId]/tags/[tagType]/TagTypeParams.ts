import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

export interface TagTypeParams extends NotebookIdParams {
    tagType: string
}