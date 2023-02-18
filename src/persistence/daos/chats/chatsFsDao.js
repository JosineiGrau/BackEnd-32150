import { FsStore } from "../../managers/fs.manager.js";

export class ChatsFsDao extends FsStore {
    // eslint-disable-next-line no-useless-constructor
    constructor(nameFile) {
        super(nameFile)
    }
}