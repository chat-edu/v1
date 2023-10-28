import { removeSubject } from '@/services/subjects'

import useAuth from "@/hooks/auth/useAuth";

import {Subject} from "@/types/Subject";

const useSubject = (subject: Subject) => {

    const { user } = useAuth();

    const deleteSubject = async () => {
        if(!user) return;
        await removeSubject(user.uid, subject)
    }

    return {
        deleteSubject
    }
}

export default useSubject