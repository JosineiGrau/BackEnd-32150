// deno-lint-ignore-file
import { Context, helpers } from "../mods.ts";
import { success } from "../networks/responses.ts";
import { UserSchema } from "../persistence/models/users.model.ts";
import { getAllUsers, getUser, createUser, deleteUser, updateUser } from "../services/users.service.ts"


export const getAllUsersController = async (ctx: Context, next: any) => {
    try {
		const users = await getAllUsers();
		success(ctx,200,'Estos son todos los Usuarios', users)
	} catch (err) {
		next(err)
	}
}

export const getUserController = async (ctx: Context, next: any) => {
    try {
        const { id } = helpers.getQuery(ctx, {mergeParams: true})
		const user = await getUser(id);
		success(ctx, 200, 'Este es el usuario que buscabas', user)
	} catch (err) {
		next(err)
	}
}

export const saveUserController = async (ctx: Context, next: any) => {
    try {
        const body: Partial<UserSchema> = await ctx.request.body().value
		const newUser = await createUser(body);
		success(ctx, 201, 'Usuario Creado', newUser)
	} catch (err) {
		next(err)
	}
}

export const deleteUserController = async (ctx: Context, next: any) => {
    try {
        const { id } = helpers.getQuery(ctx, { mergeParams: true })

		const deletedUser = await deleteUser(id);
		success(ctx, 200, 'Usuario Eliminado', deletedUser)
	} catch (err) {
		next(err)
	}
}

export const updateUserController = async (ctx: Context, next: any) => {
    try {
        const { id } = helpers.getQuery(ctx, { mergeParams: true })
        const body: Partial<UserSchema> = await ctx.request.body().value
    
		const userUpdated = await updateUser(id, body);
		success(ctx, 202, 'Usuario Actualizado', userUpdated)
	} catch (err) {
		next(err)
	}
}