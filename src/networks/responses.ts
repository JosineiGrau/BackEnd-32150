// deno-lint-ignore-file
import { Context } from "../mods.ts"

export const success = (ctx: Context, status: number, msg: string, data: any) => {
    const statusCode = status || 200
    const statusMessage = msg || 'correct'
    const body = data || {}

    ctx.response.status = statusCode
    ctx.response.body = {
        error: false,
        status: statusCode,
        message: statusMessage,
        data: body
    }
}
