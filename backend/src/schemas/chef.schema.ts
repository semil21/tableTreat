import mongoose from "mongoose";

const chefSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String
    },
    contactNumber: {
        type: Number
    },
    address: {
        type: String
    },
    aadharNumber: {
        type: Number,
    },
    specialityCategory: {
        type: String
    },
    isWorking: {
        type: Boolean,
        default: true
    }
})

const Chef = mongoose.model('Chef', chefSchema)

export default Chef