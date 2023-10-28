import {useCollectionData} from "react-firebase-hooks/firestore";

import {query} from "@firebase/firestore";

import notesCollection from "@/firebase/firestore/converters/notesConverter";

const useNotes = (userId: string, courseId: string) => {

    const [notes, loading, error] = useCollectionData(query(notesCollection(userId, courseId)));

    return {
        notes: notes || [],
        loading,
        error,
    }
}

export default useNotes;