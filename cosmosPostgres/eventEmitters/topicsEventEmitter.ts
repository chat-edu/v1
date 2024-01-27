import { EventEmitter } from "events";

class TopicsEventEmitter extends EventEmitter {}

const topicsEventEmitter = new TopicsEventEmitter();

const topicsChangedEventName = "topicsChanged";

export const emitTopicsChangedEvent = (notebookId: number) => {
    topicsEventEmitter.emit(topicsChangedEventName, notebookId);
}

export const subscribeToTopicsChangedEvent = (callback: (notebookId: number) => void) => {
    topicsEventEmitter.on(topicsChangedEventName, callback);
}

export const unsubscribeFromTopicsChangedEvent = (callback: (notebookId: number) => void) => {
    topicsEventEmitter.off(topicsChangedEventName, callback);
}