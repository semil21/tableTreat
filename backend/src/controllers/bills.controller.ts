import Order from "../schemas/orderSchema";
import { Request, Response } from "express"

const userAllOrders = async (req: Request, res: Response) => {
    const { recordId } = req.params

    try {
        const getOrders = await Order.find(
            { userId: recordId }
        ).sort({ createdAt: -1 }).lean()

        if (getOrders) {
            res.status(200).send({ response: getOrders })
        }
        else {
            res.status(400).send({ response: 'Failed to get order details' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server erroe, Failed to get all orders.' })
    }
}

const updatePaymentStatus = async (req: Request, res: Response) => {

    const { orderId } = req.params
    const { paymentStatus } = req.body
    try {
        const updateRecord = await Order.findByIdAndUpdate(
            { _id: orderId },
            { isPaid: paymentStatus }
        )

        if (updateRecord) {
            res.status(200).send({ response: "Payment  status Updated Successfully" })
        }
        else {
            res.status(400).send({ response: "Failed to payment status" })

        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server error Failed to update payment status' })
    }
}

const updatePaymetMode = async (req: Request, res: Response) => {

    const { orderId } = req.params
    const { paymentMode } = req.body
    try {
        const updateRecord = await Order.findByIdAndUpdate(
            { _id: orderId },
            { paymentMode: paymentMode }
        )

        if (updateRecord) {
            res.status(200).send({ response: "Payment  status Updated Successfully" })
        }
        else {
            res.status(400).send({ response: "Failed to payment status" })

        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server error Failed to update payment status' })
    }
}


const searchBillData = async (req: Request, res: Response) => {
    const { keyword } = req.params

    try {

        if (keyword.length === 0) {
            return;
        }
        else {

            const searchRecord = await Order.find({
                $expr: { $regexMatch: { input: { $toString: "$customerContact" }, regex: `${keyword}`, options: 'i' } }
            });

            if (searchRecord) {
                res.status(200).send({ response: searchRecord })
            }
            else {
                res.status(400).send({ response: "Failed to search record" })
            }
        }
    }
    catch (error) {
        res.status(500).send({ response: `Server Error, failed to search bill record - ${error}` })
    }
}

export default { userAllOrders, searchBillData, updatePaymentStatus, updatePaymetMode }