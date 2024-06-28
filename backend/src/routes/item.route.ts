import ItemController from "../controllers/item.controller"
import express from "express"

const itemRouter = express.Router()

itemRouter.post("/add", ItemController.postItem)
itemRouter.post("/get-item/:userId", ItemController.getItem)
itemRouter.put("/edit-item/:recordId", ItemController.editItem)
itemRouter.delete("/delete-item/:recordId", ItemController.deleteItem)
itemRouter.post("/search-item", ItemController.searchItem)

export default itemRouter