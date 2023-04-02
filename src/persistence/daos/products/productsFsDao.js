import { FsStore } from "../../managers/fs.manager.js";

export class ProductsFsDao extends FsStore {
    // eslint-disable-next-line no-useless-constructor
    constructor(nameFile) {
        super(nameFile)
    }
}
