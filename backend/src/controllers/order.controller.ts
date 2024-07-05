import Order from "../schemas/orderSchema";
import OrderItems from "../schemas/orderedItems.schema";
import { Request, Response } from "express";

const postOrder = async (req: Request, res: Response) => {
    const { tableId, userId, itemId, quantity } = req.body;

    try {
        const existingOrder = await Order.findOne({ tableId: tableId, isCompleted: false });

        if (existingOrder) {
            const orderId = existingOrder._id;
            const item = { orderId, itemId, quantity };

            const newOrderedItems = await OrderItems.create(item);

            const populatedNewOrderedItems = await OrderItems.findById(newOrderedItems._id).populate('itemId');


            res.status(200).send({ response: populatedNewOrderedItems });
        } else {
            const newOrder = await Order.create({ userId, tableId });

            if (newOrder) {
                const orderId = newOrder._id;
                const item = { orderId, itemId, quantity };

                const saveOrderedItem = await OrderItems.create(item);

                const populatedSaveOrderedItem = await OrderItems.findById(saveOrderedItem._id).populate('itemId');


                res.status(200).send({ response: populatedSaveOrderedItem });
            }
        }
    } catch (error) {
        res.status(500).send({ response: 'Server Error, failed to add item' });
    }
};


const getOrderDetails = async (req: Request, res: Response) => {
    const { tableId } = req.body
    try {
        const findOrder = await Order.findOne(
            { tableId: tableId }, { isCompleted: false }
        )
        if (findOrder) {

            const orderId = findOrder._id

            const getOrders = await OrderItems.find(
                { orderId: orderId }
            ).populate("itemId").lean()

            if (getOrders) {
                res.status(200).send({ response: getOrders })
            }
            else {
                res.status(400).send({ response: "Failed to get order details" })
            }
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, failed to get items" })
    }
}

const incrementItemQuantity = async (req: Request, res: Response) => {
    const { recordId } = req.params
    const { quantity } = req.body
    try {
        const incrementQuantity = await OrderItems.findByIdAndUpdate(
            { _id: recordId },
            { quantity: quantity },
            { new: true }
        )

        if (incrementQuantity) {
            res.status(200).send({ response: incrementQuantity })
        }
        else {
            res.status(400).send({ response: 'Failed to increment item quantity' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server error, failed to increment item quantity' })
    }
}

const decrementItemQuantity = async (req: Request, res: Response) => {
    const { recordId } = req.params
    const { quantity } = req.body
    try {
        const decrementQuantity = await OrderItems.findByIdAndUpdate(
            { _id: recordId },
            { quantity: quantity },
            { new: true }
        )

        if (decrementQuantity) {
            res.status(200).send({ response: decrementQuantity })
        }
        else {
            res.status(400).send({ response: "Failed to decrement item quantity" })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server error, failed to decement item quantity`" })
    }
}

const handleItemQuantity = async (req: Request, res: Response) => {
    const { recordId } = req.params
    const { quantity } = req.body
    try {
        const updateRecord = await OrderItems.findByIdAndUpdate(
            { _id: recordId },
            { quantity: quantity },
            { new: true }
        ).lean()

        if (updateRecord) {
            res.status(200).send({ response: updateRecord })
        }
        else {
            res.status(400).send({ response: "Failed to decrement item quantity" })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server error, Failed to increment / decrement quantity" })
    }
}

const deleteItem = async (req: Request, res: Response) => {
    const { recordId } = req.params
    try {
        const deleteRecord = await OrderItems.findByIdAndDelete(
            { _id: recordId },
            { new: true }
        )

        if (deleteRecord) {
            res.status(200).send({ response: 'Item Deleted Successfully' })
        }
        else {
            res.status(500).send({ response: "Failed to delete item" })
        }

    }
    catch (error) {
        res.status(500).send({ response: 'Server error, failed to delete item' })
    }
}

const checkOutOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params
    const { customerContact, total, grandTotal } = req.body
    try {
        const checkOut = await Order.findByIdAndUpdate(
            { _id: orderId },
            {
                isCompleted: true,
                customerContact: customerContact,
                total: total,
                grandTotal: grandTotal
            },
            { new: true }
        )

        if (checkOut) {
            res.status(200).send({ response: "Order checked-out Successfully" })
        }
        else {
            res.status(400).send({ response: "Failed to check-out order" })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, failed to check-out order" })
    }
}



export default { postOrder, getOrderDetails, incrementItemQuantity, decrementItemQuantity, handleItemQuantity, deleteItem, checkOutOrder };
