import { EventEmitter } from "events";

class UsersEventEmitter extends EventEmitter {}

const usersEventEmitter = new UsersEventEmitter();

const usersChangedEventName = "userChanged";

export const emitUsersChangedEvent = (userId: string) => {
    usersEventEmitter.emit(usersChangedEventName, userId);
}

export const subscribeToUsersChangedEvent = (callback: (notebookId: string) => void) => {
    usersEventEmitter.on(usersChangedEventName, callback);
}

export const unsubscribeFromUsersChangedEvent = (callback: (notebookId: string) => void) => {
    usersEventEmitter.off(usersChangedEventName, callback);
}