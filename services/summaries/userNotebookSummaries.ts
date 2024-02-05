import {Notebook} from "@/types/Notebook";
import {UserNotebookSummaryRow} from "@/cosmosPostgres/types";
import {User} from "@/types/User";

export const generateUserNotebookSummary = async (user_id: User["id"], notebook_id: Notebook["id"]) =>
    fetch(`/api/summaries/notebook/${notebook_id}/user/${user_id}/create`, {
        method: 'POST',
    }).then(async res => (await res.json()) as UserNotebookSummaryRow);

export const regenerateUserNotebookSummary = async (user_id: User["id"], notebook_id: Notebook["id"]) =>
    fetch(`/api/summaries/notebook/${notebook_id}/user/${user_id}/update`, {
        method: 'PATCH',
    }).then(async res => (await res.json()) as UserNotebookSummaryRow);