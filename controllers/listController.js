import { renderFile } from "../deps.js"
import * as listService from "../services/listService.js"
import * as requestUtils from "../utils/requestUtils.js"
import * as listEntryService from "../services/listEntryService.js"

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

const deactivateList = async(request) => {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    
    await listService.deactivateById(parts[2]);
    
    return requestUtils.redirectTo("/lists");
};


const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listService.create(name);

    return requestUtils.redirectTo("/lists");
};

const viewTask = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
  
    const data = {
      shopping_lists: await listService.findById(urlParts[2]),
      currentListEntry: await listEntryService.findCurrentList(urlParts[2]),
    };
  
    return new Response(await renderFile("list.eta", data), responseDetails);
  };

const countListsAndItems = async(request) => {
  const data = {
    listCount: await listService.countLists(),
    itemCount: await listEntryService.countItems(),
  }

  return new Response(await renderFile("main.eta", data), responseDetails);
}

const viewLists = async (request) => {
  
    const data = {
        shopping_lists: await listService.findAllActiveLists(),
    }
    
    return new Response(await renderFile("lists.eta", data), responseDetails);
};

export {addList, viewLists, deactivateList, viewTask, countListsAndItems};