const bcrypt = require('bcrypt');

const matchPassword = async (password, hasPass) => {
    return await bcrypt.compare(password, hasPass)
}

module.exports = matchPassword