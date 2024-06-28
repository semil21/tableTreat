import tableController from "../controllers/table.controler";
import express from "express"

const tableRouter = express.Router()

tableRouter.post("/add", tableController.postTable)
tableRouter.post("/get-table/:restaurantId", tableController.getTable)
tableRouter.put("/edit-table/:tableId", tableController.editTable)
tableRouter.put("/table-status/:tableId", tableController.updateTableStatus)
tableRouter.delete("/edit-table/:tableId", tableController.deleteTable)

export default tableRouter