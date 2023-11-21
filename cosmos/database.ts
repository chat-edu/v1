import client from "@/cosmos/client";

import {DATABASE_ID} from "@/cosmos/constants";

const getCosmosDb = async () => {
    const dbResponse = await client().databases.createIfNotExists({ id: DATABASE_ID });
    return dbResponse.database;
};

export default getCosmosDb;