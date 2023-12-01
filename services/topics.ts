import {NoteInput} from "@/types/Note";

export const getTopics = async (text: string): Promise<string[]> => {
    return fetch('/api/chat/topics/extract', {
        method: 'POST',
        body: JSON.stringify({
            text,
        })
    })
        .then(res => res.json())
        .catch(err => {
            console.log(err);
            return []
        })
}

export const generateNote = async (text: string, topic: string, notebookId: number): Promise<NoteInput> => {
    return fetch('/api/chat/topics/generate', {
        method: 'POST',
        body: JSON.stringify({
            text,
            topic,
        })
    })
        .then(res => res.json())
        .then((content: string) => {
            return {
                name: topic,
                content,
                notebookId,
            }
        })
        .catch(err => {
            console.log(err);
            return {
                name: '',
                content: '',
                notebookId: 0,
            }
        })
}