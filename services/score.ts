import {emitNotebookLeaderboardChangedEvent} from "@/cosmosPostgres/eventEmitters/notebookLeaderboardEventEmitter";

import {Notebook} from "@/types/Notebook";
import {User} from "@/types/User";

// UPDATE

export const updateScore = async (
    notebookId: Notebook["id"],
    userId: User["id"],
    incrementAmount: number
): Promise<boolean> => {
    return fetch(`/api/scores/update`, {
        method: "PATCH",
        body: JSON.stringify({
            notebook_id: notebookId,
            user_id: userId,
            increment_amount: incrementAmount
        })
    })
        .then((res) => {
            emitNotebookLeaderboardChangedEvent(notebookId)
            return res.json();
        })
        .catch(() => false);
}