import {addDoc, deleteDoc, updateDoc} from "@firebase/firestore";

import {notesCollection} from "@/firebase/firestore/collections";
import {noteDocument} from "@/firebase/firestore/documents";

import {Note, NoteInput} from "@/types/Note";

// adds a course document to the courses collection
export const addNote = async (userId: string, note: NoteInput) =>
    addDoc(notesCollection(userId, note.courseId), note)


// updates a chunk document in the chunks collection
export const updateNote = async (userId: string, note: Note) =>
    updateDoc(noteDocument(userId, note.courseId, note.id), {
        content: note.content,
    })

// removes a section from a course's sections array
export const removeNote = async (userId: string, courseId: string, noteId: string) =>
    deleteDoc(noteDocument(userId, courseId, noteId))
