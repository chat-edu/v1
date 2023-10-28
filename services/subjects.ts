import {deleteDoc, addDoc} from "@firebase/firestore";

import {subjectDocument} from "@/firebase/firestore/documents";
import {subjectsCollection} from "@/firebase/firestore/collections";

import {Subject, SubjectInput} from "@/types/Subject";

export const addSubject = async (userId: string, subject: SubjectInput) =>
    await addDoc(subjectsCollection(userId), subject)

export const removeSubject = async (userId: string, subject: Subject) =>
    await deleteDoc(subjectDocument(userId, subject.id))