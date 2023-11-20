import useContainerData from "@/hooks/queries/useContainerData";

import {Notebook} from "@/types/Notebook";

const useNotebooks = () => {
    const [notebooks, loading, error, fetchNotebooks] = useContainerData<Notebook>(`/api/notebooks`);

    return {
        notebooks: notebooks || [],
        loading,
        error,
        fetchNotebooks
    }
}

export default useNotebooks;