import {Notebook} from "@/types/Notebook";

import {UserNotebookSummaryRow} from "@/cosmosPostgres/types";

export const generateNotebookSummary = async (notebook_id: Notebook["id"]) =>
    fetch(`/api/summaries/notebook/${notebook_id}/create`, {
        method: 'POST',
    }).then(async res => (await res.json()) as UserNotebookSummaryRow);