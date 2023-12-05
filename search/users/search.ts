import {usersSearchClient} from "@/search/client";

export const searchForUsers = async (q: string) => {
    return usersSearchClient.search(`${q}*`, {

    })
        .then(async res => {
            const hits = [];
            for await (const result of res.results) {
                hits.push(result.document);
            }
            return hits;
        })
        .catch(err => {
            console.log(err);
            return [];
        });
}