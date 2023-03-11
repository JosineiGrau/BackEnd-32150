import { ObjectId } from "../../mods.ts"

export interface UserSchema {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    direction: string;
    phone: string;
    age: string;
    photo: string;
}