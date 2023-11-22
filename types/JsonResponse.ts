import {ResponseTags} from "@/prompts";

export interface JsonResponse<ContentType> {
    tag: ResponseTags,
    content: ContentType
}