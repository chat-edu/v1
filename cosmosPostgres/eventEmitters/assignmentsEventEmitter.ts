import { EventEmitter } from "events";
import {TopicRow} from "@/cosmosPostgres/types";

class AssignmentsEventEmitter extends EventEmitter {}

const assignmentsEventEmitter = new AssignmentsEventEmitter();

const assignmentsChangedEventName = "assignmentsChanged";

export const emitAssignmentsChangedEvent = (topicId: TopicRow["id"]) => {
    assignmentsEventEmitter.emit(assignmentsChangedEventName, topicId);
}

export const subscribeToAssignmentsChangedEvent = (callback: (topicId: TopicRow["id"]) => void) => {
    assignmentsEventEmitter.on(assignmentsChangedEventName, callback);
}

export const unsubscribeFromAssignmentsChangedEvent = (callback: (topicId: TopicRow["id"]) => void) => {
    assignmentsEventEmitter.off(assignmentsChangedEventName, callback);
}
