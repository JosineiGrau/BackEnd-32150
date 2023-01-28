const { check, param } = require('express-validator');
const error = require('./setError');
const validarCampos = require('./validateData');

const validationCreate = [
  check('name', 'Name is required').exists().not().isEmpty(),
  check('description', 'Description is required').exists().not().isEmpty(),
  check('code', 'Code is required').exists().not().isEmpty(),
  check('code', 'Code value numeric').not().isString(),
  check('image', 'Image is required').exists().not().isEmpty(),
  check('image', 'Image is URL').isURL(),
  check('price', 'Price is required ').exists().not().isEmpty()
  ,
  check('price').not().isString().custom((value, { req }) => {
    if(value < 10 || value > 150000) {
      throw error('Price value numeric between 10 and 150000', 400)
    }
    return true
  }),
  check('stock', 'Stock is required').exists().not().isEmpty(),
  check('stock').not().isString().custom((value, { req }) => {
    if(value > 10000) {
      throw error('Stock value numeric max 10000', 400)
    }
    return true
  }),
  (req, res, next) => {
    validarCampos(req, res, next)
  }
]

const dbIdValidate =  () => {
  return param('productId', 'Id no es valido').isMongoId()
} 
const updateProduct = [

  check().custom(dbIdValidate),
  check('name', 'Name is required').escape().optional(),
  check('description', 'Description is required').escape().optional(),
  check('code', 'Code is required').escape().optional(),
  check('image', 'Image is URL').isURL().optional(),
  check('price').not().isString().custom((value, { req }) => {
    if(value < 10 || value > 150000) {
      throw error('Price value numeric between 10 and 150000', 400)
    }
    return true
  }).optional(),
  check('stock').not().isString().custom((value, { req }) => {
    if(value > 10000) {
      throw error('Stock value numeric max 10000', 400)
    }
    return true
  }).optional(),
  validarCampos
]

const deleteProduct = [
  check().custom(dbIdValidate),
  validarCampos
]

const getProduct = [
  check().custom(dbIdValidate),
  validarCampos
]
module.exports = { validationCreate, updateProduct, deleteProduct, getProduct }