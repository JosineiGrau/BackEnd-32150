
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
  GET /productos
```

#### Get product

```http
  GET /productos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of product to fetch |

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
  PUT /productos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of product to update |
| `{data}`      |  | **Required**. Data for update product |

#### Delete product

```http
  DELETE /productos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of product to delete |


### CHAT

### Get all chats

```http
  GET /chats
```

#### Post cart

```http
  POST /chats
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `message`      | `string` | **Required**. Message to send |


### USERS

### Get all users
```http
  GET /users
```

### VIEWS

### HOME

```http
  GET /home
```

### LOGIN

```http
  GET /login
```

### LOGIN ERROR

```http
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