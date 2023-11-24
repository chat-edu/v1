import useContainerData from "@/hooks/queries/useContainerData";

import {Notebook} from "@/types/Notebook";

const useNotebooks = (extension?: string) => {
    const [notebooks, loading, error, fetchNotebooks] = useContainerData<Notebook>(`/api/notebooks${extension ? `/${extension}` : ""}`);

    return {
        notebooks: notebooks || [],
        loading,
        error,
        fetchNotebooks
    }
}

export default useNotebooks;