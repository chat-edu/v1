import useItemData from "@/hooks/queries/utilities/useItemData";

import {Notebook, RankedNotebook} from "@/types/Notebook";

const useNotebookRank = (notebookId: Notebook["id"]) => {

    const [notebookRank, loading, error] = useItemData<RankedNotebook>(`/api/notebooks/${notebookId}/rank`);

    return {
        notebookRank,
        loading,
        error
    }
}

export default useNotebookRank