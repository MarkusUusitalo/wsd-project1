import { renderFile } from "../deps.js";
import * as listEntryService from "../services/listEntryService.js";
import * as listService from "../services/listService.js"
import * as requestUtils from "../utils/requestUtils.js"
import { sql } from "../database/database.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

const createItem = async(request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const listId = parts[2];

    await listEntryService.createItem(listId, name);
    return requestUtils.redirectTo(`/lists/${listId}`);

}
const viewList = async(request) => {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const data = {
        list: await listService.findById(parts[2]),
        currentList: await listEntryService.findCurrentList(parts[2]),
    }
    
    return new Response(await renderFile("list.eta", data), responseDetails)
}

const itemCollected = async(request) => {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");

    const listId = parts[2];
    const itemId = parts[4];
    
    await listEntryService.itemCollected(listId, itemId);
    
    return requestUtils.redirectTo(`/lists/${listId}`);

}

export {viewList, createItem, itemCollected};