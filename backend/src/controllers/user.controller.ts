import User from "../schemas/user.schema"
import { Request, Response } from "express"
import bcrypt from "bcrypt"

const postUser = async (req: Request, res: Response) => {
    const { password, ...otherDetails } = req.body
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const userDetails = {
            ...otherDetails,
            password: hashedPassword
        }

        const saveUser = await User.create(userDetails)

        if (saveUser) {
            res.status(200).send({ response: saveUser })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to create user" })
    }
}

const userLogin = async (req: Request, res: Response) => {
    const { password, email } = req.body;

    try {
        const findUser = await User.findOne({ email: email }).lean()

        if (!findUser) {
            return res.status(400).send({ response: "Email Not Found" });
        }

        const hashedPassword = findUser.password;

        if (!hashedPassword) {
            return res.status(500).send({ response: "Server Error, Invalid password " });
        }

        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

        if (isPasswordCorrect) {
            return res.status(200).send({ response: findUser })
        } else {
            return res.status(400).send({ response: "Incorrect password" });
        }
    } catch (error) {
        return res.status(500).send({ response: `Server Error, Failed to Log in - ${error}` });
    }
}

const getUserDetails = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const userDetails = await User.findById({
            _id: userId
        })
        if (userDetails) {
            res.status(200).send({ response: userDetails })
        }
        else {
            res.status(400).send({ response: 'User not found' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to get user details' })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const data = req.body
    const { id } = req.params

    try {
        const postUpdatedData = await User.findByIdAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (postUpdatedData) {

            res.status(200).send({ response: postUpdatedData })
        }
        else {
            res.status(400).send({ response: "Failed to update user" })

        }


    }
    catch (error) {
        res.status(500).send({ response: `Server Error, Failed to Update User ` })
    }
}

export default { postUser, userLogin, updateUser, getUserDetails }
