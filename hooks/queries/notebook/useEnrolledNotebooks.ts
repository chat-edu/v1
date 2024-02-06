import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {User} from "@/types/User";
import {transformNotebook} from "@/hooks/queries/notebook/transformers";

const useEnrolledNotebooks = (userId: User["id"]) => {
    const [notebooks, loading, error] = useContainerData(
        `/api/notebooks/enrolled/${userId}`,
        transformNotebook
    );

    return {
        notebooks,
        loading,
        error
    };
}

export default useEnrolledNotebooks;