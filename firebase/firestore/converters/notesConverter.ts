import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import { notesCollection as baseNotesCollection } from "@/firebase/firestore/collections";

import {Note} from "@/types/Note";
import { MAX_SCORE } from "@/lib/score";


// converts a course document to a Course object, allowing for typed queries and strict type checking
const noteConverter: FirestoreDataConverter<Note> = {
    toFirestore(note: WithFieldValue<Note>): DocumentData {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            courseId: note.courseId,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Note {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            title: data.title,
            content: data.content,
            courseId: data.courseId,
            score: Math.floor(Math.random() * MAX_SCORE)
        };
    },
};

// collection reference for querying courses
const notesCollection = (userId: string, courseId: string) =>
    baseNotesCollection(userId, courseId).withConverter(noteConverter);

export default notesCollection;