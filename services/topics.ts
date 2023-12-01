export const getTopics = async (text: string): Promise<string[]> => {
    return fetch('/api/chat/topics', {
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