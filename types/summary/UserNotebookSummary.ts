import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";

export interface UserNotebookSummary {
    userId: User["id"];
    notebookId: Notebook["id"];
    summary: string;
}