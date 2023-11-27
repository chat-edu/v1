import { EventEmitter } from "events";

import {Notebook} from "@/types/Notebook";

class NotebookLeaderboardEventEmitter extends EventEmitter {}

const notebookLeaderboardEventEmitter = new NotebookLeaderboardEventEmitter();

const notebookLeaderboardChangedEventName = "notebookLeaderboardChanged";

export const emitNotebookLeaderboardChangedEvent = (notebookId: Notebook["id"]) => {
    notebookLeaderboardEventEmitter.emit(notebookLeaderboardChangedEventName, notebookId);
}

export const subscribeToNotebookLeaderboardChangedEvent = (callback: (notebookId: Notebook["id"]) => void) => {
    notebookLeaderboardEventEmitter.on(notebookLeaderboardChangedEventName, callback);
}

export const unsubscribeFromNotebookLeaderboardChangedEvent = (callback: (notebookId: Notebook["id"]) => void) => {
    notebookLeaderboardEventEmitter.off(notebookLeaderboardChangedEventName, callback);
}
