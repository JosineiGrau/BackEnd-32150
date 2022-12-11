import bcrypt from 'bcrypt'

export const matchPassword = async (password, hasPass) => {
    return await bcrypt.compare(password, hasPass)
}