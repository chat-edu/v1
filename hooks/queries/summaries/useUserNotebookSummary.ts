import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";
import useItemData from "@/hooks/queries/utilities/useItemData";
import {transformUserNotebookSummary} from "@/hooks/queries/summaries/transformer";

const useUserNotebookSummary = (userId: User["id"], notebookId: Notebook["id"]) => {
    const [userNotebookSummary, loading, error, fetchData] = useItemData(
        `/api/summaries/notebook/${notebookId}/user/${userId}`,
        transformUserNotebookSummary
    )

    return {
        userNotebookSummary,
        loading,
        error,
        fetchData
    }
}

export default useUserNotebookSummary