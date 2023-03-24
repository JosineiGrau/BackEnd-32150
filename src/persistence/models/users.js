import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		direction: {
			type: String,
		},
		phone: {
			type: String,
			required: true,
		},
		age: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: true,
		},
		rol: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const UserModel = mongoose.model(userCollection, userSchema);
