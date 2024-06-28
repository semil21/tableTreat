import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    itemName: {
        type: String
    },
    itemPrice: {
        type: Number
    }
})

const Item = mongoose.model("Item", itemsSchema)

export default Item