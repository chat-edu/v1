import {UserIdParams} from "@/app/api/summaries/user/[userId]/UserIdParams";
import {NotebookRow} from "@/cosmosPostgres/types";

export interface NotebookIdParams extends UserIdParams {
    notebookId: NotebookRow["id"];
}