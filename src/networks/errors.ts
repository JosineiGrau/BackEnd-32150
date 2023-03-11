import { Context, isHttpError } from "../mods.ts"

export const errors = async (ctx: Context, next: () => Promise<unknown>) => {
    try {
        await next()
    } catch (err) {
        if (isHttpError(err)) {
            const statusMessage = err.message || 'Internal server error'
            const statusCode = err.status || 500
            ctx.response.status = statusCode
            ctx.response.body = {
                error: true,
                status: statusCode,
                body: statusMessage
            }
        }
    }
  }
  