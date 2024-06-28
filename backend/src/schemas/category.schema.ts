import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    categoryName: {
        type: String
    }
})

const Category = mongoose.model("Category", categorySchema)

export default Category