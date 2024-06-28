import Order from "../schemas/orderSchema";
import Table from "../schemas/table.schema";
import OrderedItems from "../schemas/orderedItems.schema";
import { Request, Response } from "express";

const postNewOrder = async (req: Request, res: Response) => {
    const { tableId } = req.body;
    const { items } = req.body;

    try {
        const checkOrderExists = await Order.find(
            { tableId: tableId },
            { isCompleted: false }
        );

        if (checkOrderExists) {
            const saveOrder = (await Order.create(req.body)).toJSON();

            const orderId = saveOrder._id;
            const itemDetails = items.map((i: any) => {
                return { orderId: orderId, ...i };
            });

            if (saveOrder) {
                const saveOrderItems = await OrderedItems.create(itemDetails);

                if (saveOrderItems) {
                    res
                        .status(200)
                        .send({ response: { ...saveOrder, items: saveOrderItems } });

                } else {
                    res.status(400).send({ response: `Failed to save data` });
                }
            }
        }
    } catch (error) {
        res.status(500).send({ response: "Server Error, failed to save order" });
    }
};

const getOrderDetails = async (req: Request, res: Response) => {
    const { tableId } = req.params;

    try {
        const searchTableData = await Order.find(
            { tableId: tableId },
            { isCompleted: false }
        );
        const orderId = searchTableData[0]._id;

        if (orderId) {
            const getOrders = await OrderedItems.find({ orderId: orderId })
                .populate("itemId")
                .lean();
            if (getOrders) {
                res.status(200).send({ response: getOrders });
            }
        } else {
            res.status(400).send({ response: "Failed to Search record" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ response: "Server error, Failed to get order details" });
    }
};

const updateItemQuantity = async (req: Request, res: Response) => {
    const items = req.body;

    try {
        const bulkOps = items.map((item: any) => ({
            updateOne: {
                filter: { _id: item.itemId },
                update: { $set: { quantity: item.quantity } },
            },
        }));

        const result = await OrderedItems.bulkWrite(bulkOps);
        const updatedQuantity = res.json(result);

        if (updatedQuantity) {
            res.status(200).send({ respnse: "Quantity Updated" });
        } else {
            res.status(400).send({ response: "Failed to update quantity" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ response: "Server error, Failed to update quantity" });
    }
};

const deleteItem = async (req: Request, res: Response) => {
    const items = req.body;

    try {
        const deleteOrders = await OrderedItems.deleteMany({ _id: { $in: items } });

        if (deleteOrders) {
            res.status(200).send({ response: deleteOrders });
        } else {
            res.status(400).send({ response: "Failed to delete item" });
        }
    } catch (error) {
        res.status(500).send({ response: "Server Error Failed to delete item" });
    }
};

export default {
    postNewOrder,
    getOrderDetails,
    updateItemQuantity,
    deleteItem,
};
