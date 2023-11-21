import {CosmosClient} from "@azure/cosmos";

console.log(process.env.COSMOS_ENDPOINT)

const COSMOS_CLIENT: CosmosClient = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT as string,
    key: process.env.COSMOS_KEY as string,
});

export default COSMOS_CLIENT;
