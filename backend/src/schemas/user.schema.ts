import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    contact: {
        type: Number
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
})

const User = mongoose.model("User", userSchema)
export default User