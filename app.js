import { serve } from "./deps.js";
import { configure, renderFile } from './deps.js';
import * as listController from "./controllers/listController.js";
import * as listEntryController from "./controllers/listEntryController.js";
import * as requestUtils from "./utils/requestUtils.js";


configure({
  views: `${Deno.cwd()}/views/`,
});


const handleRequest = async (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  
  if (request.method === "GET" && path === "/") {
    return await listController.countListsAndItems(request);
  }

  else if (request.method === "GET" && path === "/lists") {
    return await listController.viewLists(request);
  }

  else if (request.method === "POST" && path === "/lists") {
    return await listController.addList(request);
  }

  else if (request.method === "POST" && path.match("/lists/[0-9]+/deactivate")) {
    return await listController.deactivateList(request);
  }

  else if (request.method === "POST" && path.match("lists/[0-9]+/items/[0-9]+")) {
    return await listEntryController.itemCollected(request);
  }

  else if (request.method === "POST" && path.match("lists/[0-9]+/items")) {
    return await listEntryController.createItem(request);
  }

  else if (request.method === "GET" && path.match("lists/[0-9]+")) {
    return await listEntryController.viewList(request);
  }

  else {
    return new Response("Not found", { status: 404 });
  }
  


  
};

serve(handleRequest, { port: 7777 });
