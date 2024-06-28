import Chef from "../schemas/chef.schema";
import { Request, Response } from "express";

const postNewChef = async (req: Request, res: Response) => {
    try {

        const saveData = await Chef.create(req.body)

        if (saveData) {
            res.status(200).send({ response: saveData })
        }
        else {
            res.status(400).send({ response: 'Failed to save chef data' })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server error, failed to save chef data" })
    }
}

const getChefRecord = async (req: Request, res: Response) => {

    const { userId } = req.params
    try {
        const getData = await Chef.find({
            userId: userId
        })

        if (getData) {
            res.status(200).send({ response: getData })
        }
        else {
            res.status(400).send({ response: "Failed to get chef records " })
        }

    }
    catch (error) {
        res.status(500).send({ response: "Server error, failed to save chef records" })
    }
}

const editChefRecord = async (req: Request, res: Response) => {

    const { chefId } = req.params
    const data = req.body

    try {
        const editRecord = await Chef.findByIdAndUpdate(
            { _id: chefId },
            data,
            { new: true }
        )

        if (editRecord) {
            res.status(200).send({ response: editRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to Edit Chef' })

        }

    }
    catch (error) {
        res.status(500).send({ response: "Server error failed to edit chef" })
    }
}

const deleteChef = async (req: Request, res: Response) => {
    const { chefId } = req.params
    try {
        const deleteRecord = await Chef.findByIdAndDelete(
            { _id: chefId },
            { new: true }
        )

        if (deleteRecord) {
            res.status(200).send({ response: deleteRecord })
        }
        else {
            res.status(400).send({ response: "Failed to Delete ched record." })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server error failed to delete chef" })
    }
}

export default { postNewChef, getChefRecord, editChefRecord, deleteChef }