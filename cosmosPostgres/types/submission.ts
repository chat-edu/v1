// used on the server side to create a new multiple choice submission
export interface SubmissionRowInput {
    user_id: string;
    question_id: number;
    answer: string;
}

// returned from the database when querying for a multiple choice submission
export interface SubmissionRow extends SubmissionRowInput {
    id: number;
}