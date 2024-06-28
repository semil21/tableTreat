import mongoose, { Mongoose, Types } from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    },
    customerContact: {
        type: Number
    },
    // items: [
    //     {
    //         item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    //         quantity: { type: Number, default: 1 }
    //     }
    // ],
    total: {
        type: Number,
        default: 0
    },
    grendTotal: {
        type: Number,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    }
})

const Order = mongoose.model("Order", OrderSchema)

export default Order