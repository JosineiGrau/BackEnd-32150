const FsStore = require("../../managers/fs.manager");

class ChatsFsDao extends FsStore {
    // eslint-disable-next-line no-useless-constructor
    constructor(nameFile) {
        super(nameFile)
    }
}

module.exports = ChatsFsDao