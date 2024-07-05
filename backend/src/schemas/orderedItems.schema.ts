import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    itemId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const OrderItems = mongoose.model("OrderItems", orderItemsSchema)

export default OrderItems
