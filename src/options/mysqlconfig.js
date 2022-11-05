import * as dotenv from 'dotenv';
dotenv.config();

export const options = {
    connection_MariaDB: {
        client: "mysql",
        connection:{
            host: "127.0.0.1",
            port : 3306,
            user: "root",
            password: "",
            database: "mitienda"
        }
    },
    connection_mysqlite : {
        client: 'sqlite3',
        connection: {
            filename: 'chat.sqlite'
        }
    }
}