// deno-lint-ignore-file
import { usersRouter } from "./api/users.routes.ts"
import { Router } from "../mods.ts"
import { Application } from "../mods.ts"

const router = new Router()

export const apiRouter = (app: Application<Record<string, any>>) => {
    app.use(router.routes())
    router.use('/users', usersRouter.routes())
  
    // router.use('*', async (ctx) => {
    //     ctx.response.status = 400
    //     ctx.response.body = {
    //         error: -2,
    //     description: {
    //       route: ctx.request.url,
    //       method: ctx.request.method,
    //       msg: 'not implemented'
    //     }
    //     }
    
    // })
  }