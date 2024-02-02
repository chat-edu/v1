import { EventEmitter } from "events";

import {Notebook} from "@/types/Notebook";
import {Note} from "@/types/Note";

class NoteEventEmitter extends EventEmitter {}

const noteEventEmitter = new NoteEventEmitter();

const noteChangedEventName = "noteChanged";

export const emitNoteChangedEvent = (notebookId: Notebook["id"]) => {
    noteEventEmitter.emit(noteChangedEventName, notebookId);
}

export const subscribeToNoteChangedEvent = (callback: (noteId: Note["id"]) => void) => {
    noteEventEmitter.on(noteChangedEventName, callback);
}

export const unsubscribeFromNoteChangedEvent = (callback: (notebookId: Note["id"]) => void) => {
    noteEventEmitter.off(noteChangedEventName, callback);
}