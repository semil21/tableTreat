import { timeStamp } from "console";
import mongoose, { Mongoose, Types } from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        // restraurnat id / owner id
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tableId: {
        // restaurant table id
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    },
    customerContact: {
        // to be taken at checkout
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    grandTotal: {
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
    },
    paymentMode: {
        type: String,
        default: "-"
    }
}, { timestamps: true })

const Order = mongoose.model("Order", OrderSchema)

export default Order