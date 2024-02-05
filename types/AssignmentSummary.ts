import {User} from "@/types/User";
import {Assignment} from "@/types/assignment/Assignment";

export interface AssignmentSummary {
    userId: User["id"];
    assignmentId: Assignment["id"];
    summary: string;
}