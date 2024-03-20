import {Model} from "@/types/Model";
import openai from "@/llm/openai";
import anthropic from "@/llm/anthropic";
import gemini from "@/llm/google";

export const generateWithSystemPrompt = async (promptContent: string, model: Model): Promise<string> => {
    switch (model) {
        case Model.OPENAI:
            return openai.chat.completions.create({
                model: process.env.GPT_MODEL_ID as string,
                messages: [
                    {
                        role: "system",
                        content: promptContent
                    }
                ],
                response_format: {
                    type: "json_object"
                }
            })
                .then(response => response.choices[0].message.content || "")
                .catch(() => "");
        case Model.ANTHROPIC:
            return anthropic.messages.create({
                messages: [{
                    role: 'user',
                    content: promptContent
                }],
                model: 'claude-3-haiku-20240307',
                system: "When asked for JSON, only include the JSON, starting with { and ending with }, in your response. DO NOT inlcude ```json ``` or any other text besides the JSON object itself.",
                max_tokens: 4096
            })
                .then(message => {
                    const response = message.content.map((message) => message.text).join("\n");
                    if (response.startsWith("```json")) {
                        return response.substring(7, response.length - 3);
                    }
                    return response;
                })
                .catch(() => "");
        case Model.GOOGLE:
            return gemini
                .getGenerativeModel({ model: 'gemini-pro' })
                .generateContent({
                    contents: [{
                        role: 'user',
                        parts: [
                            {
                                text: promptContent + "\n" + "Make sure to only use the escape character \\n to denote a new line, not just pressing \"Enter\". When asked for JSON, make sure to include quotes around the keys and values. For example, {\"key\": \"value\"}."
                            }
                        ]
                    }]
                })
                    .then(response => response.response.text() || "")
                    .catch(() => "");
        default:
            return Promise.resolve("");
    }
};