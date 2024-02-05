import {UserRow} from "@/cosmosPostgres/types";

export interface UserIdParams {
    userId: UserRow["id"];
}