import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import { userDocument as baseUserDocument } from "@/firebase/firestore/documents";
import { usersCollection as baseUsersCollection } from "@/firebase/firestore/collections";

import {User} from "@/types/User";

// converts a course document to a Course object, allowing for typed queries and strict type checking
const subjectConverter: FirestoreDataConverter<User> = {
    toFirestore(user: WithFieldValue<User>): DocumentData {
        return {
            isNewUser: user.isOnboarded,
            score: user.score,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): User {
        const data = snapshot.data(options);
        return {
            isOnboarded: data.isOnboarded || false,
            score: data.score || 0,
        };
    },
}

// collection reference for querying subjects
const usersCollection =  baseUsersCollection.withConverter(subjectConverter);

export const userDocument = (userId: string) => baseUserDocument(userId).withConverter(subjectConverter);

export default usersCollection;