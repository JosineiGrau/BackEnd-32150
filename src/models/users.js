import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export const UserModel = mongoose.model(userCollection,userSchema);
