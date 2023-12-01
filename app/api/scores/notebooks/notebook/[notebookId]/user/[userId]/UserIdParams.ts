import {UserRow} from "@/cosmosPostgres/types";

import {NotebookIdParams} from "@/app/api/scores/notebooks/notebook/[notebookId]/NotebookIdParams";

export interface UserIdParams extends NotebookIdParams {
    userId: UserRow["id"];
}