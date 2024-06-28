import chefController from "../controllers/chef.controller";
import express from "express"

const chefRouter = express.Router()

chefRouter.post("/get/:userId", chefController.getChefRecord)
chefRouter.post("/add", chefController.postNewChef)

export default chefRouter