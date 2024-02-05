import {User} from "@/types/User";
import {Assignment} from "@/types/assignment/Assignment";
import {UserAssignmentSummaryRow} from "@/cosmosPostgres/types";

export const generateUserAssignmentSummary = async (userId: User["id"], assignmentId: Assignment["id"]) => {
    return fetch(`/api/summaries/assignment/${assignmentId}/user/${userId}/create`, {
        method: 'POST',
    }).then(async res => (await res.json()) as UserAssignmentSummaryRow);
}