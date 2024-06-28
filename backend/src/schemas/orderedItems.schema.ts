import mongoose from "mongoose";

const orderedItemsSchema = new mongoose.Schema({
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

const OrderedItems = mongoose.model("OrderedItems", orderedItemsSchema)

export default OrderedItems
