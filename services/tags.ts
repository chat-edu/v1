import {TagRow} from "@/types/Tags";

export const addTag = async (tag: TagRow): Promise<TagRow | null> =>
    fetch(`/api/tags/${tag.notebook_id}/add`, {
        method: "POST",
        body: JSON.stringify(tag)
    })
        .then(res => res.json())
        .catch(null);