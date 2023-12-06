import { EventEmitter } from "events";

import {Notebook} from "@/types/Notebook";

class NotesEventEmitter extends EventEmitter {}

const notesEventEmitter = new NotesEventEmitter();

const notesChangedEventName = "notesChanged";

export const emitNotesChangedEvent = (notebookId: Notebook["id"]) => {
    notesEventEmitter.emit(notesChangedEventName, notebookId);
}

export const subscribeToNotesChangedEvent = (callback: (notebookId: Notebook["id"]) => void) => {
    notesEventEmitter.on(notesChangedEventName, callback);
}

export const unsubscribeFromNotesChangedEvent = (callback: (notebookId: Notebook["id"]) => void) => {
    notesEventEmitter.off(notesChangedEventName, callback);
}