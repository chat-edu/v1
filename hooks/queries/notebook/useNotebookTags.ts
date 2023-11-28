import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {Notebook} from "@/types/Notebook";
import {NotebookTag} from "@/types/Tags";

const useNotebookTags = (notebookId: Notebook["id"]) => {

    const [tags, loading, error, fetchTags] = useContainerData<NotebookTag>(`/api/notebooks/${notebookId}/tags`);

    return {
        tags: tags || [],
        loading,
        error,
        fetchTags
    }
}

export default useNotebookTags;