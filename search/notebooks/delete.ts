import {notebooksSearchClient} from "@/search/client";

export const deleteNotebookIndexRows = async (notebookIds: string[]) =>
    notebooksSearchClient.deleteDocuments("id" as never, notebookIds)
        .then(res => console.log(res))
        .catch(err => console.log(err))