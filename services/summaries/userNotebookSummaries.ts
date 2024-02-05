import {Notebook} from "@/types/Notebook";
import {UserNotebookSummaryRow} from "@/cosmosPostgres/types";
import {User} from "@/types/User";

export const generateUserNotebookSummary = async (user_id: User["id"], notebook_id: Notebook["id"]) =>
    fetch(`/api/summaries/user/${user_id}/notebook/${notebook_id}/create`, {
        method: 'POST',
    }).then(async res => (await res.json()) as UserNotebookSummaryRow);