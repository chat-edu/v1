import {UserRow} from "@/cosmosPostgres/types";
import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";

export interface UserIdParams extends NotebookIdParams {
    userId: UserRow["id"];
}