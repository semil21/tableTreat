import RestaurantController from "../controllers/restaurant.controller";
import express from "express"

const restrauntRouter = express.Router()

restrauntRouter.post("/add", RestaurantController.postRestaurant)
restrauntRouter.post("/get/:id", RestaurantController.getRestaurantData)
restrauntRouter.put("/update/:id", RestaurantController.updateRestaurant)
restrauntRouter.delete("/delete/:id", RestaurantController.deleteRestaurant)

export default restrauntRouter