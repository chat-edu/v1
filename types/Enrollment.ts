import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";

export interface Enrollment {
    userId: User["id"];
    notebookId: Notebook["id"];
}

export interface EnrollmentInput {
    userId: User["id"];
    accessCode: string;
}