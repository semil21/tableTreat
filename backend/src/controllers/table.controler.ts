import Table from "../schemas/table.schema";
import { Request, Response, response } from "express";

const postTable = async (req: Request, res: Response) => {
    try {
        const saveData = await Table.create(req.body)

        if (saveData) {
            res.status(200).send({ response: saveData })
        }
        else {
            res.status(404).send({ response: 'Failed TO Save Table Data' })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to save data" })
    }
}

const getTable = async (req: Request, res: Response) => {
    const { restaurantId } = req.params
    try {
        const getData = await Table.find({ userId: restaurantId }).sort({ "tableNumber": 1 })

        if (getData) {
            res.status(200).send({ response: getData })
        }
        else {
            res.status(404).send({ response: "Failed To Get Table Data" })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error Failed to get Record" })
    }
}

const editTable = async (req: Request, res: Response) => {
    const { tableId } = req.params
    const data = req.body

    try {
        const saveUpdatedData = await Table.findOneAndUpdate(
            { _id: tableId },
            data,
            { new: true }
        )
        if (saveUpdatedData) {
            res.status(200).send({ response: saveUpdatedData })
        }
        else {
            res.status(400).send({ response: 'Failed to Save Updated Data.' })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to Edit Table " })
    }
}

const deleteTable = async (req: Request, res: Response) => {
    const { tableId } = req.params
    try {
        const deleteTable = await Table.findByIdAndDelete(
            { _id: tableId },
            { new: true }
        )

        if (deleteTable) {
            res.status(200).send({ response: deleteTable })
        }
        else {
            res.status(400).send({ response: 'Failed to Delete Table' })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to Delete Table" })
    }
}

const updateTableStatus = async (req: Request, res: Response) => {
    const { tableId } = req.params
    const { isOccupied } = req.body

    const newStatus = isOccupied === true ? false : true
    try {
        const updateStatus = await Table.findByIdAndUpdate(
            { _id: tableId },
            { isOccupied: newStatus },
            { new: true }
        )

        if (updateStatus) {
            res.status(200).send({ response: updateStatus })
        }
        else {
            res.status(400).send({ response: 'Error in updating tabele status' })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server serror failed to update table status" })
    }
}

export default { postTable, getTable, editTable, deleteTable, updateTableStatus }