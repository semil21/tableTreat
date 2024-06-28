import { compareSync } from "bcrypt";
import Item from "../schemas/item.schema";
import { Request, Response, response } from "express";

const postItem = async (req: Request, res: Response) => {
    try {
        const saveData = await (await Item.create(req.body)).populate("categoryId")

        if (saveData) {
            res.status(200).send({ response: saveData })
        }
        else {

            res.status(500).send({ response: 'Failed to Save Data' })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error Failed to Save Item" })
    }
}

const getItem = async (req: Request, res: Response) => {

    const { userId } = req.params

    try {
        const getData = await Item.find(
            { userId: userId },
        ).populate('categoryId', '_id categoryName')

        if (getData) {
            res.status(200).send({ response: getData })
        }
        else {
            res.status(500).send({ response: "Failed To Get Items" })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error" })
    }
}

const editItem = async (req: Request, res: Response) => {
    const { recordId } = req.params
    const data = req.body

    try {
        const editRecord = await Item.findByIdAndUpdate(
            { _id: recordId },
            data,
            { new: true }
        ).populate("categoryId")

        if (editRecord) {
            res.status(200).send({ response: editRecord })
        }
        else {
            res.status(400).send({ response: "Failed to edit item" })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server errror failed to edit item" })
    }
}

const deleteItem = async (req: Request, res: Response) => {
    const { recordId } = req.params
    try {
        const deleteRecord = await Item.findByIdAndDelete(
            { _id: recordId },
        )

        if (deleteRecord) [
            res.status(200).send({ response: "Record Deleted Successfully" })
        ]
        else {
            res.status(400).send({ response: "Failed to delete record" })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server error, failed to delete item" })
    }
}

const searchItem = async (req: Request, res: Response) => {
    const { searchKey } = req.body
    try {

        if (searchKey.length === 0) {
            return;
            // res.status(200).send({ response: 0 })
        }
        else {
            const findItem = await Item.find({
                itemName: new RegExp(searchKey, "i")
            }).populate('categoryId', '_id categoryName')

            if (findItem) {
                res.status(200).send({ response: findItem })
            }
            else {
                res.status(400).send({ response: "No Item Found" })
            }
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server error, Failed to search item" })
    }
}

export default { postItem, getItem, editItem, deleteItem, searchItem }