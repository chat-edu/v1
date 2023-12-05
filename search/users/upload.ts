import {usersSearchClient} from "@/search/client";

import {UserIndexRow} from "@/search/types/UserIndex";

export const uploadUserRows = async (rows: UserIndexRow[]) => {
    await usersSearchClient.uploadDocuments(rows)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}