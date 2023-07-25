import { sql } from "../database/database.js";

const createItem = async(listId, name) => {
    await sql `INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${listId}, ${name})`;
};

const findCurrentList = async(listId) => {
    const rows = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id=${listId} ORDER BY name ASC`

    if (rows && rows.length > 0) {
        return rows;
    }

    return false;
};

const itemCollected = async(listId, itemId) => {
    await sql`UPDATE shopping_list_items SET collected = true WHERE (shopping_list_id = ${listId}) AND (id = ${itemId})`;
}

const countItems = async() => {
    const count = await sql`SELECT COUNT(*) FROM shopping_list_items`;
    return count[0].count;
}


export { findCurrentList, createItem, itemCollected, countItems };


