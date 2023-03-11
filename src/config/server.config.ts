import { config } from "../mods.ts"

const { DB_PORT, DB_MONGO_URL } = config()

export const serverConfig = {
    port: DB_PORT || 8080,
    dataBaseUrl: DB_MONGO_URL,
}