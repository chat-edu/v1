import {collection} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

export const USERS_COLLECTION_SLUG = 'users';

export const SUBJECTS_COLLECTION_SLUG = 'subjects';

export const NOTES_COLLECTION_SLUG = 'notes';

export const usersCollection = collection(firestore, USERS_COLLECTION_SLUG);

export const subjectsCollection = (userId: string) =>
    collection(firestore, USERS_COLLECTION_SLUG, userId, SUBJECTS_COLLECTION_SLUG);

export const notesCollection = (userId: string, subjectId: string) =>
    collection(firestore, USERS_COLLECTION_SLUG, userId, SUBJECTS_COLLECTION_SLUG, subjectId, NOTES_COLLECTION_SLUG);