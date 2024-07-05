import orderController from "../controllers/order.controller";
import express from "express"

const orderRouter = express.Router()

orderRouter.post("/add", orderController.postOrder)
orderRouter.post("/get", orderController.getOrderDetails)
orderRouter.put("/increment/:recordId", orderController.incrementItemQuantity)
orderRouter.put("/decrement/:recordId", orderController.decrementItemQuantity)
orderRouter.put("/quantity/:recordId", orderController.handleItemQuantity)
orderRouter.put("/checkout/:orderId", orderController.checkOutOrder)
orderRouter.delete("/delete/:orderId", orderController.deleteItem)

export default orderRouter