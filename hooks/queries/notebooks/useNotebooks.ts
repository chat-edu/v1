import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {Notebook} from "@/types/Notebook";

const useNotebooks = <T extends Notebook>(extension?: string) => {
    const [notebooks, loading, error, fetchNotebooks] = useContainerData<T>(`/api/notebooks${extension ? `/${extension}` : ""}`);

    return {
        notebooks: notebooks || [],
        loading,
        error,
        fetchNotebooks
    }
}

export default useNotebooks;