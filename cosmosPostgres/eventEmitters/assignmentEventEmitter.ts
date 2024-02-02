import { EventEmitter } from "events";
import {AssignmentRow, TopicRow} from "@/cosmosPostgres/types";

class AssignmentEventEmitter extends EventEmitter {}

const assignmentEventEmitter = new AssignmentEventEmitter();

const assignmentChangedEventName = "assignmentChanged";

export const emitAssignmentChangedEvent = (assignmentId: AssignmentRow["id"]) => {
    assignmentEventEmitter.emit(assignmentChangedEventName, assignmentId);
}

export const subscribeToAssignmentChangedEvent = (callback: (assignmentId: AssignmentRow["id"]) => void) => {
    assignmentEventEmitter.on(assignmentChangedEventName, callback);
}

export const unsubscribeFromAssignmentChangedEvent = (callback: (assignmentId: AssignmentRow["id"]) => void) => {
    assignmentEventEmitter.off(assignmentChangedEventName, callback);
}
