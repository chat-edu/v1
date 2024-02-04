import {add, del, find} from "@/cosmosPostgres/services/base";

import {ENROLLMENTS_TABLE} from "@/cosmosPostgres/constants/tables";

import {EnrollmentRow} from "@/cosmosPostgres/types/enrollment";
import {NotebookRow, UserRow} from "@/cosmosPostgres/types";

// CREATE

export const addEnrollment = (enrollment: EnrollmentRow) => {
    return add<EnrollmentRow, EnrollmentRow>(ENROLLMENTS_TABLE, enrollment);
}

// READ

export const findEnrollmentsByUserId = (userId: UserRow["id"]) => {
    return find<EnrollmentRow>(`SELECT * from ${ENROLLMENTS_TABLE} where user_id = $1`, [userId]);
}

export const findEnrollmentsByNotebookId = (notebookId: NotebookRow["id"]) => {
    return find<EnrollmentRow>(`SELECT * from ${ENROLLMENTS_TABLE} where notebook_id = $1`, [notebookId]);
}

// DELETE

export const delEnrollment = (enrollment: EnrollmentRow) => {
    return del(ENROLLMENTS_TABLE, [enrollment.user_id, enrollment.notebook_id], ["user_id", "notebook_id"]);
}