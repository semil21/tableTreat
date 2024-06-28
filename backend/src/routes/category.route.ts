import CategoryController from "../controllers/category.controller"
import express from "express"

const categoryRouter = express.Router()

categoryRouter.post("/add", CategoryController.postCategory)
categoryRouter.post("/get/:userId", CategoryController.getCategory)
categoryRouter.post("/search", CategoryController.serachCategory)
categoryRouter.put("/edit/:categoryId", CategoryController.editCategory)
categoryRouter.delete("/delete/:categoryId", CategoryController.deleteCategory)

export default categoryRouter