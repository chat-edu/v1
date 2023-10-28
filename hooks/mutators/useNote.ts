import useAuth from "@/hooks/auth/useAuth";

import {removeNote} from "@/services/notes";

const useNote = (courseId: string, noteId: string) => {

    const { user } = useAuth();
    
    const deleteNote = async () => {
        if(!user) return;
        await removeNote(user.uid, courseId, noteId)
    }

    return {
        deleteNote
    }
}

export default useNote;