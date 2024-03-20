import openai from "../../../llm/openai";

export const POST = async (request: Request) => {

    let body = await request.json();

    if(!body.text) {
        return new Response("Missing text", { status: 400 })
    }

    let response = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: body.text,
    })

    let buffer = await response.arrayBuffer()
    let blob = new Blob([buffer], { type: "audio/mpeg" })
    return new Response(blob, {
        headers: {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "attachment; filename=hello-world.mp3"
        }
    })
}