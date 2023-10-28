import {useCollectionData} from "react-firebase-hooks/firestore";

import subjectsCollection from "@/firebase/firestore/converters/subjectConverter";

import useAuth from "@/hooks/auth/useAuth";

const useSubjects = () => {

    const { user } = useAuth();


    const [courses, loading, error] = useCollectionData(subjectsCollection(user?.uid || "a"));

    return {
        courses: courses || [],
        loading,
        error,
    }
}

export default useSubjects;