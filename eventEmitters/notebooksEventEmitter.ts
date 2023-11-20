import { EventEmitter } from "events";

class NotebooksEventEmitter extends EventEmitter {}

const notebooksEventEmitter = new NotebooksEventEmitter();

const notebooksChangedEventName = "notebooksChanged";

export const emitNotebooksChangedEvent = (userId: string) => {
    notebooksEventEmitter.emit(notebooksChangedEventName, userId);
}

export const subscribeToNotebooksChangedEvent = (callback: (userId: string) => void) => {
    notebooksEventEmitter.on(notebooksChangedEventName, callback);
}

export const unsubscribeFromNotebooksChangedEvent = (callback: (userId: string) => void) => {
    notebooksEventEmitter.off(notebooksChangedEventName, callback);
}
