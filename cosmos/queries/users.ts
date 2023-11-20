import { SqlQuerySpec } from "@azure/cosmos";

export const allUsersQuery: SqlQuerySpec = {
    query: "SELECT * from c"
}