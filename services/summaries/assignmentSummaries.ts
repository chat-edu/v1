import {Assignment} from "@/types/assignment/Assignment";
import {UserAssignmentSummaryRow} from "@/cosmosPostgres/types";
import {Model} from "@/types/Model";

export const generateAssignmentSummary = async (assignment_id: Assignment["id"], model: Model) =>
    fetch(`/api/summaries/assignment/${assignment_id}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({model}),
    }).then(async res => (await res.json()) as UserAssignmentSummaryRow);

export const regenerateAssignmentSummary = async (assignment_id: Assignment["id"], model: Model) =>
    fetch(`/api/summaries/assignment/${assignment_id}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({model}),
    }).then(async res => (await res.json()) as UserAssignmentSummaryRow);