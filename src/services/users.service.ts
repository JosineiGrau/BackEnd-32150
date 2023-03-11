import { UserDaoContainer } from "../persistence/index.ts";
import { UserSchema } from "../persistence/models/users.model.ts";

export const getAllUsers = async () => {
    const users = await UserDaoContainer.getAll()
    return users
}

export const getUser = async (_id: string) => {
    const users = await UserDaoContainer.getById(_id, 'User')
    return users
}

export const createUser = async (data: Partial<UserSchema>) => {
    const newUser = await UserDaoContainer.save(data)
    return newUser
}

export const deleteUser = async (_id: string) => {
    const userDelete = await UserDaoContainer.deleteById(_id, 'User')
    return userDelete
}

export const updateUser = async (_id: string, data: Partial<UserSchema>) => {
    const userUpdated = await UserDaoContainer.update(_id, data)
    return userUpdated
}