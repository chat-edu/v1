import {Container, ItemDefinition, PartitionKey, PartitionKeyDefinition, SqlQuerySpec} from '@azure/cosmos';

import getCosmosDb from "@/cosmos/database";

export const getContainer = async (id: string, partitionKey?: PartitionKeyDefinition) =>
    (await (await getCosmosDb()).containers.createIfNotExists({id, partitionKey})).container

export const find = async <T>(container: Container, querySpec: SqlQuerySpec): Promise<T[]> =>
    (await container.items.query(querySpec).fetchAll()).resources as T[];

export const add = async <T extends ItemDefinition>(container: Container, input: T): Promise<boolean> =>
    container.items.create(input)
        .then(() => true)
        .catch(() => false);



export const update = async <T extends ItemDefinition>(
    container: Container,
    id: string,
    updatedFields: Partial<T>,
    partitionKey?: PartitionKey,
): Promise<boolean> => {
    const doc = await get<T>(container, id, partitionKey);
    const updatedDoc = { ...doc, ...updatedFields };
    return replace(container, id, updatedDoc, partitionKey)
        .then(() => true)
        .catch(() => false);
}


export const replace = async <T extends ItemDefinition>(
    container: Container,
    id: string,
    updatedDoc: T,
    partitionKey?: PartitionKey,
): Promise<boolean> =>
    container.item(id, partitionKey).replace(updatedDoc)
        .then(() => true)
        .catch(() => false);

export const get = async <T>(container: Container, id: string, partitionKey?: PartitionKey): Promise<T> =>
    (await container.item(id, partitionKey).read()).resource as T;

export const del = async (container: Container, id: string, partitionKey?: PartitionKey): Promise<boolean> =>
    container.item(id, partitionKey).delete()
        .then(() => true)
        .catch(() => false);