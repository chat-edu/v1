import {Notebook} from "@/types/Notebook";

import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformEnrollment} from "@/hooks/queries/enrollments/transformEnrollment";

const useEnrollments = (notebookId: Notebook["id"]) => {
    const [enrollments, loading, error, fetchData] = useContainerData(
        `/api/enrollment/notebook/${notebookId}`,
        transformEnrollment
    )

    return {
        enrollments,
        loading,
        error,
        fetchData
    }
}

export default useEnrollments