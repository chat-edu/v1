import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformRankedNotebook} from "@/hooks/queries/scores/notebooks/transformers";

const useTopNotebooks = (limit?: number) => {
    const [notebooks, loading, error] = useContainerData(
        `/api/scores/notebooks${limit ? `?limit=${limit}` : ""}`,
        transformRankedNotebook
    );

    return {
        notebooks,
        loading,
        error,
    }
}

export default useTopNotebooks