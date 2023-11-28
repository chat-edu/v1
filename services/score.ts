import {emitNotebookLeaderboardChangedEvent} from "@/azure/cosmos/eventEmitters/notebookLeaderboardEventEmitter";

import {Notebook} from "@/types/Notebook";
import {User} from "@/types/User";

// UPDATE

export const updateScore = async (
    notebookId: Notebook["id"],
    userId: User["id"],
    incrementAmount: number
): Promise<boolean> => {
    return fetch(`/api/notebooks/${notebookId}/scores/${userId}/update`, {
        method: "PATCH",
        body: JSON.stringify({incrementAmount})
    })
        .then((res) => {
            emitNotebookLeaderboardChangedEvent(notebookId)
            return res.json();
        })
        .catch(() => false);
}