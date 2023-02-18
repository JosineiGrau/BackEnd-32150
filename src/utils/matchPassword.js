import bcrypt from 'bcrypt';

const matchPassword = async (password, hasPass) => {
    return await bcrypt.compare(password, hasPass)
}

export default matchPassword