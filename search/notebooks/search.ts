import {notebooksSearchClient} from "@/search/client";

export const searchForNotebooks = async (q: string) => {
    return notebooksSearchClient.search(`${q}*`, {

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