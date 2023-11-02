import {useCollectionData} from "react-firebase-hooks/firestore";

import {query} from "@firebase/firestore";

import useAuth from "@/hooks/auth/useAuth";

import notesCollection from "@/firebase/firestore/converters/notesConverter";

const useNotes = (courseId: string) => {

    const { user } = useAuth();

    const [notes, loading, error] = useCollectionData(query(notesCollection(user?.uid || "a", courseId)));

    return {
        notes: notes || [],
        loading,
        error,
    }
}

export default useNotes;