import billsController from "../controllers/bills.controller";
import express from "express"

const billRouter = express.Router()

billRouter.post("/orders/:recordId", billsController.userAllOrders)
billRouter.post("/search/:keyword", billsController.searchBillData)
billRouter.put("/update-payment/:orderId", billsController.updatePaymentStatus)
billRouter.put("/payment-mode/:orderId", billsController.updatePaymetMode)

export default billRouter