import orderController from "../controllers/order.controller"
import express from "express"

const orderRouter = express.Router()

orderRouter.post("/add", orderController.postNewOrder)
orderRouter.post("/get/:tableId", orderController.getOrderDetails)
orderRouter.post("/update-quantity", orderController.updateItemQuantity)
orderRouter.delete("/delete-item", orderController.deleteItem)

export default orderRouter