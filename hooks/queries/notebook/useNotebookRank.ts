import useItemData from "@/hooks/queries/utilities/useItemData";
import {transformRankedNotebook} from "@/hooks/queries/notebook/transformers";

import {Notebook} from "@/types/Notebook";

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