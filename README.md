
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

### AUTH

#### Register

```http
  POST /register
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name user to save |
| `email`      | `string` | **Required**. Email user to save |
| `password`      | `string` | **Required**. Password user to save |
| `direction`      | `string` | **Required**. Direction user to save |
| `phone`      | `string` | **Required**. Phone user to save |
| `age`      | `number` | **Required**. Age user to save |
| `photo`      | `string` | **Required**.  Photo user to savee |


#### Login

```http
  POST /login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email user to save |
| `password`      | `string` | **Required**. Password user to save |


#### Logout

```http
  POST /logout
```

### PRODUCTS

#### Get all products

```http
  GET /productos
```

#### Get product

```http
  GET /productos/${productID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. productID of product to fetch |

#### Post product

```http
  POST /productos
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
  PUT /productos/${productID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. productID of product to update |
| `{data}`      |  | **Required**. Data for update product |

#### Delete product

```http
  DELETE /productos/${productID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. productID of product to delete |


### CARTS

### Get all carts

```http
  GET /carritos
```

#### Get cart

```http
  GET /carritos/${cartID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. cartID of cart to fetch |

#### Post cart

```http
  POST /carritos
```

#### Post product to cart

```http
  POST /carritos/${cartID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Cart cartID to save the product |
| `body = id`      | `number` | **Required**. ProductID of the product |


#### Delete cart

```http
  DELETE /carritos/${cartID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of cart to delete |


#### Delete product to cart

```http
  DELETE /carritos/${cartID}/productos/${productId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of cart |
| `productId`      | `number` | **Required**. Id of product to delete |

#### Buy Items

```http
  POST /carritos/buy/${cartID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. cartID of cart |