import {notebooksSearchClient} from "@/search/client";

import {NotebookIndexRow} from "@/search/types/NotebookIndex";

export const uploadNotebookRows = async (rows: NotebookIndexRow[]) => {
    await notebooksSearchClient.uploadDocuments(rows)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}