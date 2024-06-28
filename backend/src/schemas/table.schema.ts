import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tableNumber: {
        type: Number,
    },
    tableCapacity: {
        type: Number
    },
    isOccupied: {
        type: Boolean,
        default: false
    }
})

const Table = mongoose.model("Table", tableSchema)

export default Table