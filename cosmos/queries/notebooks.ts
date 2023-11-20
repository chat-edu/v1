import { SqlQuerySpec } from "@azure/cosmos";

export const allNotebooksQuery: SqlQuerySpec = {
    query: "SELECT * from c"
}

export const notebooksByUserIdQuery = (userId: string): SqlQuerySpec => ({
    query: "SELECT * from c WHERE c.userId = @userId",
    parameters: [
        { name: "@userId", value: userId }
    ]
})