import useSearch from "@/hooks/queries/search/useSearch";

import {NotebookIndexRow} from "@/search/types/NotebookIndex";

const useNotebooksSearch = (input: string) => {
    const { results, loading } = useSearch<NotebookIndexRow>(input, "/api/notebooks/search");

    return {
        results,
        loading
    }
}

export default useNotebooksSearch;