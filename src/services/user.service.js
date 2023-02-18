import { covertToDto } from '../dtos/user.dto.js'
import { getApiDao } from '../persistence/index.js';
import config from '../config/config.js';

const { UserDaoContainer } = await getApiDao(config.server.dbType)

export const getAllUsers = async () => {
    const users = await UserDaoContainer.getAll()
    return covertToDto(users)
}
