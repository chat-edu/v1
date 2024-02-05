import {Assignment} from "@/types/assignment/Assignment";

export interface AssignmentSummary {
    assignmentId: Assignment["id"];
    summary: string;
}