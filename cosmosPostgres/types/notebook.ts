// used on the server side to create a new notebook
import {UserRow} from "@/cosmosPostgres/types/user";

export interface NotebookRowInput {
    name: string;
    user_id: UserRow["id"];
}

// returned from the database when querying for a notebook
export interface NotebookRow extends NotebookRowInput {
    id: number;
    username: UserRow["username"];
    verified: UserRow["verified"];
    num_notes: string;
}