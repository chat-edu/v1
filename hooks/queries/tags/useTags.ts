import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformTag} from "@/hooks/queries/tags/transformers";

import {Notebook} from "@/types/Notebook";

const useTags = (notebookId: Notebook["id"]) => {

    const [tags, loading, error, fetchTags] = useContainerData(`/api/tags/notebook/${notebookId}`, transformTag);

    return {
        tags: tags || [],
        loading,
        error,
        fetchTags
    }
}

export default useTags;