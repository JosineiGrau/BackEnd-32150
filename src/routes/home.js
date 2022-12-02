import { Router } from "express";

const homeRoute = Router()

homeRoute.get('/', (req, res) => {
    res.render('home', {name: req.session.name})
})

export {homeRoute}
