
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


### CHAT

### Get all chats

```http
  GET /api/chats
```

#### Post cart

```http
  POST /api/chats
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `message`      | `string` | **Required**. Message to send |


### VIEWS

### HOME

```http
  GET /api/home
```

### LOGIN

```http
  GET /api/login
```

### LOGIN ERROR

```http
  GET /api/login/error
```

### REGISTER

```http
  GET /api/register
```

### REGISTER ERROR

```http
  GET /api/register/error
```

### LOGOUT

```http
  GET /api/logout
```

### PRODUCTS

```http
  GET /api/coder/productos
```

### CHATS

```http
  GET /api/coder/chats
```

### INFO

```http
  GET /api/info
```

# HTML
```http
  GET /api/info/vista
```

### NUMBERS RANDOMS

```http
  GET /api/randoms
```

```http
  GET /api/randoms/no-bloqueante
```