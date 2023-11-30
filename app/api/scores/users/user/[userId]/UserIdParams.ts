import {UserRow} from "@/azure/cosmos/types";

export interface UserIdParams {
    userId: UserRow["id"];
}