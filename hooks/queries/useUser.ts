import {useDocumentData} from "react-firebase-hooks/firestore";

import useAuth from "@/hooks/auth/useAuth";

import {userDocument} from "@/firebase/firestore/converters/usersConverter";

const useUser = () => {

    const { user } = useAuth();

    const [userData, loading, error] = useDocumentData(userDocument(user?.uid || "a"));

    return {
        user,
        userData,
        loading,
        error,
    }
}

export default useUser;