import {getPool} from "@/azure/cosmos/citus";

import {QueryResultRow} from "pg";

export const find = async <RowType extends QueryResultRow, ReturnType>(
    queryText: string,
    values: any[],
    transform: (row: RowType) => ReturnType
): Promise<ReturnType[]> => {
    const client = await getPool().connect();
    try {
        const { rows } = await client.query<RowType>(queryText, values)
            .then((result) => result)
            .catch((error) => {
                console.log(queryText, values);
                console.error('Error in find operation:', error);
                return { rows: [] };
            });
        return rows.map(transform);
    } finally {
        client.release();
    }
};

export const add = async (tableName: string, input: object): Promise<boolean> => {
    const client = await getPool().connect();
    try {
        const columns = Object.keys(input).join(', ');
        const values = Object.values(input);
        const valuePlaceholders = values.map((_, index) => `$${index + 1}`).join(', ');

        const queryText = `INSERT INTO ${tableName} (${columns}) VALUES (${valuePlaceholders}) RETURNING *`;
        await client.query(queryText, values);
        return true;
    } catch (error) {
        console.error('Error in add operation:', error);
        return false;
    } finally {
        client.release();
    }
};

// make an update function for when the id is a composite key
export const update = async(
    tableName: string,
    id: any[],
    updatedFields: object,
    idColumnNames: string[] = ['id']
): Promise<boolean> => {
const client = await getPool().connect();
    try {
        const updates = Object.keys(updatedFields).map((key, index) => `${key} = $${index + 1}`);
        const values = [...Object.values(updatedFields), ...id];
        const queryText = `
            UPDATE ${tableName} 
            SET ${updates.join(', ')} 
            WHERE ${idColumnNames.map((idColumnName, index) => `${idColumnName} = $${index + 1 + Object.values(updatedFields).length}`).join(' AND ')}
        `;
        await client.query(queryText, values);
        return true;
    } catch (error) {
        console.error('Error in update operation:', error);
        return false;
    } finally {
        client.release();
    }
};

// make a get function for when the id is a composite key
export const get = async <RowType extends QueryResultRow, ReturnType>(
    query: string,
    values: any[],
    transform: (row: RowType) => ReturnType,
): Promise<ReturnType | null> => {
    const client = await getPool().connect();
    try {
        const { rows } = await client.query<RowType>(query, values)
            .catch((error) => {
                console.log(query, values);
                console.error('Error in get operation:', error);
                return { rows: [] };
            });
        return rows && rows.length ? transform(rows[0]) : null;
    } finally {
        client.release();
    }
}

export const del = async (
    tableName: string,
    id: any[],
    idColumnNames: string[] = ['id']
): Promise<boolean> => {
    const client = await getPool().connect();
    try {
        const queryText = `
            DELETE FROM ${tableName} 
            WHERE ${idColumnNames.map((idColumnName, index) => `${idColumnName} = $${index + 1}`).join(' AND ')}
        `;
        await client.query(queryText, id);
        return true;
    } catch (error) {
        console.error('Error in delete operation:', error);
        return false;
    } finally {
        client.release();
    }
}