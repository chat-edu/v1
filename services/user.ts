import {updateDoc, increment, setDoc} from "@firebase/firestore";
import {userDocument} from "@/firebase/firestore/documents";

export const setUserDoc = async (userId: string) =>
    setDoc(userDocument(userId), {
        isOnboarded: true,
        score: 0,
    })

export const updateUserScore = async (userId: string, changeAmount: number) =>
    updateDoc(userDocument(userId), {
        score: increment(changeAmount)
    })
