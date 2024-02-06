import {User} from "@/types/User";
import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";

export interface UserIdParams extends NotebookIdParams {
    userId: User["id"];
}