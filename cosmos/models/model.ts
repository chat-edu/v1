import {Container, ItemDefinition, SqlQuerySpec} from '@azure/cosmos';

import COSMOS_CLIENT from "@/cosmos/client";

class Model<InputType extends ItemDefinition, ItemType> {

    private readonly databaseId: string;
    private readonly containerId: string;
    private readonly partitionKey: string | undefined;

    private container: Container | undefined;

    constructor(databaseId: string, containerId: string, partitionKey: string | undefined) {
        this.databaseId = databaseId;
        this.containerId = containerId;
        this.partitionKey = partitionKey;
    }

    private async getContainer(): Promise<Container> {
        if(!this.container) {
            const {container} = await COSMOS_CLIENT.database(this.databaseId).containers.createIfNotExists({
                id: this.containerId,
                partitionKey: this.partitionKey
            });
            this.container = container;
        }
        return this.container;
    }

    async find(querySpec: SqlQuerySpec): Promise<ItemType[]> {
        const { resources } = await (await this.getContainer()).items.query(querySpec).fetchAll();
        return resources as ItemType[];
    }

    async add(input: InputType): Promise<ItemType | null> {
        const { resource } = await (await this.getContainer()).items.create(input);
        return resource as ItemType;
    }

    async update(id: string, updatedFields: Partial<InputType>): Promise<ItemType | null> {
        const doc = await this.get(id);
        const updatedNotebook = { ...doc, ...updatedFields };

        const { resource } = await (await this.getContainer()).item(id, this.partitionKey).replace(updatedNotebook);
        return resource as ItemType;
    }

    async get(id: string): Promise<ItemType | null> {
        if(!this.container) return null;
        const { resource } = await (await this.getContainer()).item(id, this.partitionKey).read();
        return resource as ItemType;
    }
}

export default Model;
