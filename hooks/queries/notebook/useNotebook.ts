import useItemData from "@/hooks/queries/utilities/useItemData";
import {transformNotebook} from "@/hooks/queries/notebook/transformers";

import {Notebook} from "@/types/Notebook";

const useNotebook = (notebookId: Notebook["id"]) => {
    const [notebook, loading, error] = useItemData(
        `/api/notebooks/${notebookId}`,
        transformNotebook
    );

    return {
        notebook,
        loading,
        error
    }
}

export default useNotebook;