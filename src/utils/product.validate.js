import { check, param } from 'express-validator'
import { config } from '../config/config.js'
import { validarCampos } from './validateData.js'

const validationCreate = [
  check('name', 'Name is required').not().isEmpty().escape(),
  check('description', 'Description is required').not().isEmpty().escape(),
  check('code', 'Code is required').not().isEmpty().escape(),
  check('image', 'Image is required').not().isEmpty(),
  check('image', 'Image is URL').isURL(),
  check('price', 'Price is required ').not().isEmpty(),
  check('price', 'Price value numeric between 10 and 150000').not().isString(),
  check('stock', 'Stock is required').not().isEmpty(),
  check('stock', 'Stock value numeric between 10 and 10000').not().isString(),
  validarCampos
]

const dbIdValidate =  () => {
  if(config.database === 'Firebase') return param('productId', 'Id no es valido').isString()
  if(config.database === 'Mongo') return param('productId', 'Id no es valido').isMongoId()
  if(config.database === 'FS') return param('productId', 'Id no es valido').isInt()
} 
const updateProduct = [

  check().custom(dbIdValidate),
  check('name', 'Name is required').escape().optional(),
  check('description', 'Description is required').escape().optional(),
  check('code', 'Code is required').escape().optional(),
  check('image', 'Image is URL').isURL().optional(),
  check('price', 'Price value numeric between 10 and 150000').not().isString().optional(),
  check('stock', 'Stock value numeric between 10 and 10000').not().isString().optional(),
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

export { validationCreate, updateProduct, deleteProduct, getProduct }