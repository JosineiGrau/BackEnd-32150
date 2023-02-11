const config = require('../config/config');
const covertToDto = require('../dtos/user.dto');
const getApiDao = require('../persistence/index');


let db;

getApiDao(config.server.dbType).then((data) => {
  db = data.UserDaoContainer
})

const getAllUsers = async () => {
    const users = await db.getAll()
    return covertToDto(users)
}

module.exports = {
    getAllUsers
}