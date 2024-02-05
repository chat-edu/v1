import useItemData from "@/hooks/queries/utilities/useItemData";

import {transformAssignmentSummary} from "@/hooks/queries/summaries/transformer";

import {Assignment} from "@/types/assignment/Assignment";

const useAssignmentSummary = (assignmentId: Assignment["id"]) => {
    const [assignmentSummary, loading, error, fetchData] = useItemData(
        `/api/summaries/assignment/${assignmentId}`,
        transformAssignmentSummary
    )

    return {
        assignmentSummary,
        loading,
        error,
        fetchData
    }
}

export default useAssignmentSummary