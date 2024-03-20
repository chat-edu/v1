import {Notebook} from "@/types/Notebook";

import {UserNotebookSummaryRow} from "@/cosmosPostgres/types";

import {Model} from "@/types/Model";

export const generateNotebookSummary = async (notebook_id: Notebook["id"], model: Model) =>
    fetch(`/api/summaries/notebook/${notebook_id}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({model}),
    }).then(async res => (await res.json()) as UserNotebookSummaryRow);

export const regenerateNotebookSummary = async (notebook_id: Notebook["id"], model: Model) =>
    fetch(`/api/summaries/notebook/${notebook_id}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({model}),
    }).then(async res => (await res.json()) as UserNotebookSummaryRow);