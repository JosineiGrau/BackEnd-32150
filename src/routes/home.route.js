import { Router } from "express";
import { checkSession } from "../middleware/auth.js";

const homeRoute = Router()

homeRoute.get('/', checkSession,(req, res) => {
    res.render('home')
})

export {homeRoute}
