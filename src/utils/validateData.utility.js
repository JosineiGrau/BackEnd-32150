import { validationResult } from 'express-validator';

export const validarCampos = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (err) {
    res.status(403).send(err)
  }
}
