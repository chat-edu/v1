import useItemData from "@/hooks/queries/utilities/useItemData";

import {Notebook} from "@/types/Notebook";

const useNotebook = (notebookId: Notebook["id"]) => {
    const [notebook, loading, error] = useItemData<Notebook>(`/api/notebooks/${notebookId}`);

    return {
        notebook,
        loading,
        error
    }
}

export default useNotebook;