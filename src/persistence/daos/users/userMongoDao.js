import { MongoStore } from "../../managers/mongo.manager.js";

export class UserMongoDao extends MongoStore {
    // eslint-disable-next-line no-useless-constructor
    constructor(collectionModel) {
        super(collectionModel)
    }
}