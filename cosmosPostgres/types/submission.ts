// used on the server side to create a new multiple choice submission
export interface SubmissionRowInput {
    user_id: string;
    question_id: number;
    answer: string;
}

// returned from the database when querying for a multiple choice submission
export interface SubmissionRow extends SubmissionRowInput {
    id: number;
    points: number | null;
    grade_explanation: string | null;
}

export interface GradeExplanation {
    points: number;
    grade_explanation: string;
}

export interface SubmissionRowWithQuestion extends SubmissionRow {
    question: string,
    question_number: number,
    assignment_id: number,
}