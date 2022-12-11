import mongoose from "mongoose";
// import bcrypt from 'bcrypt'

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

// userSchema.methods.encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10)
//     return await bcrypt.hash(password, salt)
// }
// userSchema.methods.matchPassword = async (password) => {
//     return await bcrypt.compare(password, this.password)
// }

export const UserModel = mongoose.model(userCollection,userSchema);
