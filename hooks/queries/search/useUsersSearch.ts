import useSearch from "@/hooks/queries/search/useSearch";

import {UserIndexRow} from "@/search/types/UserIndex";

const useUsersSearch = (input: string) => {
    const { results, loading } = useSearch<UserIndexRow>(input, "/api/users/search");

    return {
        results,
        loading
    }
}

export default useUsersSearch;