import UserController from "../controllers/user.controller"
import express from "express"

const userRouter = express.Router()

userRouter.post("/create-user", UserController.postUser)
userRouter.post("/user-login", UserController.userLogin)
userRouter.post("/get-user/:userId", UserController.getUserDetails)
userRouter.put("/edit-user/:id", UserController.updateUser)

export default userRouter
