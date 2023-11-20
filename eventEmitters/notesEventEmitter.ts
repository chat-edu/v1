import { EventEmitter } from "events";

class NotesEventEmitter extends EventEmitter {}

const notesEventEmitter = new NotesEventEmitter();

const notesChangedEventName = "notesChanged";

export const emitNotesChangedEvent = (notebookId: string) => {
    notesEventEmitter.emit(notesChangedEventName, notebookId);
}

export const subscribeToNotesChangedEvent = (callback: (notebookId: string) => void) => {
    notesEventEmitter.on(notesChangedEventName, callback);
}

export const unsubscribeFromNotesChangedEvent = (callback: (notebookId: string) => void) => {
    notesEventEmitter.off(notesChangedEventName, callback);
}