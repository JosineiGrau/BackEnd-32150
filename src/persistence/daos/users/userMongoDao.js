const MongoStore = require("../../managers/mongo.manager");


class UserMongoDao extends MongoStore {
    // eslint-disable-next-line no-useless-constructor
    constructor(collectionModel) {
        super(collectionModel)
    }
}

module.exports = UserMongoDao