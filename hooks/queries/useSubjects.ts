import {useCollectionData} from "react-firebase-hooks/firestore";

import subjectsCollection from "@/firebase/firestore/converters/subjectConverter";

import useAuth from "@/hooks/auth/useAuth";

const useSubjects = () => {

    const { user } = useAuth();


    const [subjects, loading, error] = useCollectionData(subjectsCollection(user?.uid || "a"));

    return {
        subjects: subjects || [],
        loading,
        error,
    }
}

export default useSubjects;