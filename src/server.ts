import { Application } from "./mods.ts";
import { serverConfig } from "./config/server.config.ts";
import { apiRouter } from "./routes/index.ts";
import { errors } from "./networks/errors.ts";

const app = new Application()

app.use(errors)


app.listen({ port:  Number(serverConfig.port) });

apiRouter(app)
