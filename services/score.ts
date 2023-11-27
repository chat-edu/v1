import {emitNotebookLeaderboardChangedEvent} from "@/azure/cosmos/eventEmitters/notebookLeaderboardEventEmitter";

import {Notebook} from "@/types/Notebook";
import {User} from "@/types/User";
import {ScoreRow} from "@/types/Score";

// UPDATE

export const updateScore = async (
    notebookId: Notebook["id"],
    userId: User["id"],
    incrementAmount: number
): Promise<ScoreRow | null> => {
    return fetch(`/api/notebooks/${notebookId}/scores/${userId}/update`, {
        method: "PATCH",
        body: JSON.stringify({incrementAmount})
    })
        .then((res) => {
            emitNotebookLeaderboardChangedEvent(notebookId)
            return res.json();
        })
        .catch(null);
}