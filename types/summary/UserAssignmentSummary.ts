import {User} from "@/types/User";
import {Assignment} from "@/types/assignment/Assignment";

export interface UserAssignmentSummary {
    userId: User["id"];
    assignmentId: Assignment["id"];
    summary: string;
}