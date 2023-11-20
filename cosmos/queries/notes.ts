import { SqlQuerySpec } from "@azure/cosmos";

export const notesByNotebookQuery = (notebookId: string): SqlQuerySpec => ({
    query: "SELECT * from c WHERE c.notebookId = @notebookId",
    parameters: [
        { name: "@notebookId", value: notebookId }
    ]
})