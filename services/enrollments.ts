import {Enrollment, EnrollmentInput} from "@/types/Enrollment";
import {EnrollmentRow, EnrollmentRowInput} from "@/cosmosPostgres/types/enrollment";

export const addEnrollment = async (enrollment: EnrollmentInput) => {
    const response = await fetch('/api/enrollment/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transformEnrollmentInput(enrollment))
    });
    return await response.json() as EnrollmentRow | null;
}

export const deleteEnrollment = async (enrollment: Enrollment) => {
    const response = await fetch('/api/enrollment/delete', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transformEnrollment(enrollment))
    });
    return await response.json();
}

const transformEnrollmentInput = (enrollment: EnrollmentInput): EnrollmentRowInput => ({
    user_id: enrollment.userId,
    access_code: enrollment.accessCode
})

const transformEnrollment = (enrollment: Enrollment): EnrollmentRow => ({
    user_id: enrollment.userId,
    notebook_id: enrollment.notebookId
})