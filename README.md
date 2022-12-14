# My Api Store

This is a back-end project developed with:
- [Node js](https://nodejs.org/en/)
- [Express js](https://expressjs.com/es/)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

### PRODUCTS

#### Get all products

```http
  GET /api/productos
```

#### Get product

```http
  GET /api/productos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of product to fetch |

#### Post product

```http
  POST /api/productos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of product to save |
| `description`      | `string` | **Required**. Description of product to save |
| `code`      | `number` | **Required**. Code of product to save |
| `image`      | `string` | **Required**. Image of product to save |
| `price`      | `number` | **Required**. Price of product to save |
| `stock`      | `number` | **Required**. Stock of product to save |

#### Put product

```http
  PUT /api/productos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of product to update |
| `{data}`      |  | **Required**. Data for update product |

#### Delete product

```http
  DELETE /api/productos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of product to delete |


### CARTS

### Get all carts

```http
  GET /api/carritos
```

#### Get cart

```http
  GET /api/carritos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of cart to fetch |

#### Post cart

```http
  POST /api/carritos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of cart to save |

#### Delete cart

```http
  DELETE /api/carritos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of cart to delete |

#### Post product to cart

```http
  POST /api/carritos/${id}/productos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Cart id to save the product |
| `body = id`      | `number` | **Required**. Id of the product |

#### Delete product to cart

```http
  DELETE /api/carritos/${id}/productos/${productId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of cart |
| `productId`      | `number` | **Required**. Id of product to delete |
