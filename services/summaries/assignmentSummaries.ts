import {Assignment} from "@/types/assignment/Assignment";
import {User} from "@/types/User";
import {UserAssignmentSummaryRow} from "@/cosmosPostgres/types";

export const generateAssignmentSummary = async (assignment_id: Assignment["id"]) =>
    fetch(`/api/summaries/assignment/${assignment_id}/create`, {
        method: 'POST',
    }).then(async res => (await res.json()) as UserAssignmentSummaryRow);