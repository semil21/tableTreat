import mongoose from "mongoose";
import User from "./user.schema";

const restaurantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String
    },
    contact: {
        type: Number
    },
    email: {
        type: String,
        default: null
    },
    address: {
        type: String
    }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant
