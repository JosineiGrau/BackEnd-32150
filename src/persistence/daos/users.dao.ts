import { MongoStore } from "../managers/mongo.manager.ts";
import  { Collection, Document} from "../../mods.ts"

export class UsersMongoDao extends MongoStore {
    constructor(collection: Collection<Document>) {
        super(collection)
    }
}