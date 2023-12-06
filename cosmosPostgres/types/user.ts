// used on the server side to create a new user
export interface UserRowInput {
    id: string;
    name: string;
    email: string;
    username: string;
    profile_picture_url: string;
}

// returned from the database when querying for a user
export interface UserRow extends UserRowInput {
    verified: boolean;
    is_onboarded: boolean;
}