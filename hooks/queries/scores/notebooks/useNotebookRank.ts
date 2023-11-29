import useItemData from "@/hooks/queries/utilities/useItemData";

import {Notebook} from "@/types/Notebook";
import {transformRankedNotebook} from "@/hooks/queries/scores/notebooks/transformers";

const useNotebookRank = (notebookId: Notebook["id"]) => {

    const [notebookRank, loading, error] = useItemData(
        `/api/notebooks/${notebookId}/rank`,
        transformRankedNotebook
    );

    return {
        notebookRank,
        loading,
        error
    }
}

export default useNotebookRank