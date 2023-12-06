import {TagRow} from "@/cosmosPostgres/types/tag";

export const addTag = async (tag: TagRow): Promise<TagRow | null> =>
    fetch(`/api/tags/add`, {
        method: "POST",
        body: JSON.stringify(tag)
    })
        .then(res => res.json())
        .catch(null);