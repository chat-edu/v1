import {Assignment} from "@/types/assignment/Assignment";
import {User} from "@/types/User";
import {AssignmentSummaryRow} from "@/cosmosPostgres/types";

export const generateSummary = async (assignment_id: Assignment["id"], user_id: User["id"]) =>
    fetch(`/api/summaries/create`, {
        method: 'POST',
        body: JSON.stringify({assignment_id, user_id}),
    }).then(async res => (await res.json()) as AssignmentSummaryRow);