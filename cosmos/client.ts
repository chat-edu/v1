import {CosmosClient} from "@azure/cosmos";

const cosmosClient = (): CosmosClient => new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT as string,
    key: process.env.COSMOS_KEY as string,
});

export default cosmosClient;
