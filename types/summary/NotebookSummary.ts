import {Notebook} from "@/types/Notebook";

export interface NotebookSummary {
    notebookId: Notebook["id"];
    summary: string;
}