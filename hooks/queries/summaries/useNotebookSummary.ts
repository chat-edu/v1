import useItemData from "@/hooks/queries/utilities/useItemData";

import {transformNotebookSummary} from "@/hooks/queries/summaries/transformer";

import {Notebook} from "@/types/Notebook";

const useNotebookSummary = (notebookId: Notebook["id"]) => {
    const [notebookSummary, loading, error, fetchData] = useItemData(
        `/api/summaries/notebook/${notebookId}`,
        transformNotebookSummary
    )

    return {
        notebookSummary,
        loading,
        error,
        fetchData
    }
}

export default useNotebookSummary