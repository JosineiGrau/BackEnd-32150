
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
<<<<<<< HEAD
  GET /productos/${productID}
=======
  GET /productos/${id}
>>>>>>> ProyectoFinal
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
<<<<<<< HEAD
  PUT /productos/${productID}
=======
  PUT /productos/${id}
>>>>>>> ProyectoFinal
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. productID of product to update |
| `{data}`      |  | **Required**. Data for update product |

#### Delete product

```http
<<<<<<< HEAD
  DELETE /productos/${productID}
=======
  DELETE /productos/${id}
>>>>>>> ProyectoFinal
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. productID of product to delete |


### CARTS

### Get all carts

```http
<<<<<<< HEAD
  GET /carritos
=======
  GET /chats
>>>>>>> ProyectoFinal
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
<<<<<<< HEAD
  POST /carritos
=======
  POST /chats
>>>>>>> ProyectoFinal
```

#### Post product to cart

```http
  POST /carritos/${cartID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Cart cartID to save the product |
| `body = id`      | `number` | **Required**. ProductID of the product |


<<<<<<< HEAD
#### Delete cart

```http
  DELETE /carritos/${cartID}
=======
### USERS

### Get all users
```http
  GET /users
```

### VIEWS

### HOME

```http
  GET /home
>>>>>>> ProyectoFinal
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of cart to delete |


#### Delete product to cart

```http
<<<<<<< HEAD
  DELETE /carritos/${cartID}/productos/${productId}
=======
  GET /login
>>>>>>> ProyectoFinal
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of cart |
| `productId`      | `number` | **Required**. Id of product to delete |

#### Buy Items

```http
<<<<<<< HEAD
  POST /carritos/buy/${cartID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. cartID of cart |
=======
  GET /login/error
```

### REGISTER

```http
  GET /register
```

### REGISTER ERROR

```http
  GET /register/error
```

### LOGOUT

```http
  GET /logout
```

### PRODUCTS

```http
  GET /productos/view
```

### CHATS

```http
  GET /chats/view
```

### INFO

```http
  GET /info
```

# HTML
```http
  GET /info/view
```

### NUMBERS RANDOMS

```http
  GET /randoms
```

```http
  GET /randoms/no-bloqueante
```
>>>>>>> ProyectoFinal
