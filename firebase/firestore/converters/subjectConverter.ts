import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import { subjectsCollection as baseSubjectsCollection } from "@/firebase/firestore/collections";

import {Subject} from "@/types/Subject";

// converts a course document to a Course object, allowing for typed queries and strict type checking
const subjectConverter: FirestoreDataConverter<Subject> = {
    toFirestore(subject: WithFieldValue<Subject>): DocumentData {
        return {
            id: subject.id,
            name: subject.name,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Subject {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            name: data.name,
        };
    },
}

// collection reference for querying subjects
const subjectsCollection = (userId: string) => baseSubjectsCollection(userId).withConverter(subjectConverter);

export default subjectsCollection;