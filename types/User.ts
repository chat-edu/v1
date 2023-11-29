// used on the client side to create a new user
export interface UserInput {
    id: string;
    name: string;
    email: string;
    username: string;
    profilePictureUrl: string;
}

// used on the client side to display a user
export interface User extends UserInput {
    verified: boolean;
}

// used on the client side to display a user's score on a notebook
export interface UserNotebookScore extends User {
    score: number;
}

// used on the client side to display a user and their rank
export interface RankedUser extends User {
    rank: number;
}

export interface RankedUserNotebookScore extends UserNotebookScore, RankedUser {}

// used on the client side to display a ranked user and their total score
export interface RankedUserTotalScore extends RankedUser {
    totalScore: number;
}

// used on the client side to display a ranked user, the total score on their notebooks, and the number of notebooks they have created
export interface RankedUserCreatorScore extends RankedUserTotalScore {
    numNotebooks: number;
}