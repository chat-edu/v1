import {User} from "@/types/User";
import {Assignment} from "@/types/assignment/Assignment";
import {UserAssignmentSummaryRow} from "@/cosmosPostgres/types";
import {Model} from "@/types/Model";

export const generateUserAssignmentSummary = async (userId: User["id"], assignmentId: Assignment["id"], model: Model) => {
    return fetch(`/api/summaries/assignment/${assignmentId}/user/${userId}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({model}),
    }).then(async res => (await res.json()) as UserAssignmentSummaryRow);
}