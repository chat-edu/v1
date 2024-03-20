import {Notebook} from "@/types/Notebook";
import {UserNotebookSummaryRow} from "@/cosmosPostgres/types";
import {User} from "@/types/User";
import {Model} from "@/types/Model";

export const generateUserNotebookSummary = async (user_id: User["id"], notebook_id: Notebook["id"], model: Model) =>
    fetch(`/api/summaries/notebook/${notebook_id}/user/${user_id}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({model}),
    }).then(async res => (await res.json()) as UserNotebookSummaryRow);

export const regenerateUserNotebookSummary = async (user_id: User["id"], notebook_id: Notebook["id"], model: Model) =>
    fetch(`/api/summaries/notebook/${notebook_id}/user/${user_id}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({model}),
    }).then(async res => (await res.json()) as UserNotebookSummaryRow);