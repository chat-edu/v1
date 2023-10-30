import useAuth from "@/hooks/auth/useAuth";

import {removeNote} from "@/services/notes";

import {Note} from "@/types/Note";

const useNote = (note: Note) => {

    const { user } = useAuth();
    
    const deleteNote = async () => {
        if(!user) return;
        await removeNote(user.uid, note.courseId, note.id)
    }

    return {
        deleteNote
    }
}

export default useNote;