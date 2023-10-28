import {doc} from "@firebase/firestore";

import firestore from "@/firebase/firestore/firestore";

import {
    NOTES_COLLECTION_SLUG,
    SUBJECTS_COLLECTION_SLUG,
    USERS_COLLECTION_SLUG
} from "@/firebase/firestore/collections";

export const subjectDocument = (userId: string, subjectId: string) =>
    doc(firestore, USERS_COLLECTION_SLUG, userId, SUBJECTS_COLLECTION_SLUG, subjectId);

export const noteDocument = (userId: string, courseId: string, noteId: string) =>
    doc(firestore, USERS_COLLECTION_SLUG, userId, SUBJECTS_COLLECTION_SLUG, courseId, NOTES_COLLECTION_SLUG, noteId);
