import {Notebook} from "@/types/Notebook";
import {User} from "@/types/User";
import {emitNotebookLeaderboardChangedEvent} from "@/eventEmitters/notebookLeaderboardEventEmitter";

export const updateScore = async (
    notebookId: Notebook["id"],
    userId: User["id"],
    incrementAmount: number
): Promise<boolean> => {
    return fetch(`/api/notebooks/${notebookId}/scores/${userId}/update`, {
        method: "POST",
        body: JSON.stringify({incrementAmount})
    })
        .then(() => {
            emitNotebookLeaderboardChangedEvent(notebookId)
            return true;
        })
        .catch(() => false);
}