
export const getSpeech = async (text: string) => {
    if(!text) return null;
    let res = await fetch('/api/speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
    let blob = await res.blob();
    let url = URL.createObjectURL(blob);
    return new Audio(url);
}