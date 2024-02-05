import {EnrollmentRow} from "@/cosmosPostgres/types/enrollment";
import {Enrollment} from "@/types/Enrollment";

export const transformEnrollment = (enrollmentRow: EnrollmentRow): Enrollment => ({
    userId: enrollmentRow.user_id,
    notebookId: enrollmentRow.notebook_id
})