class UserDto {
    constructor({_id, name, email, age}) {
        this._id = _id
        this.name = name
        this.email = email
        this.age = age
    }
}

const covertToDto = (users) => {
    if (Array.isArray(users)) {
        const newData = users.map((user) =>  new UserDto(user))
        return newData
    } else {
        const newData = new UserDto(users)
        return newData
    }
}

module.exports = covertToDto