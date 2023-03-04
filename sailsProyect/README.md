# My Api Store

This is a back-end project developed with:

- [Node js](https://nodejs.org/en/)
- [Express js](https://expressjs.com/es/)
- [Sails](https://sailsjs.com)

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
  GET /products
```

#### Get product

```http
  GET /products/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `number` | **Required**. Id of product to fetch |

#### Post product

```http
  POST /products
```

| Parameter     | Type     | Description                                  |
| :------------ | :------- | :------------------------------------------- |
| `name`        | `string` | **Required**. Name of product to save        |
| `description` | `string` | **Required**. Description of product to save |
| `code`        | `number` | **Required**. Code of product to save        |
| `image`       | `string` | **Required**. Image of product to save       |
| `price`       | `number` | **Required**. Price of product to save       |
| `stock`       | `number` | **Required**. Stock of product to save       |

#### Put product

```http
  PUT /products/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `number` | **Required**. Id of product to update |
| `{data}`  |          | **Required**. Data for update product |

#### Delete product

```http
  DELETE /products/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `number` | **Required**. Id of product to delete |

### Routes BluePrint

#### Get all products

```http
  GET /products/find
```

#### Get product

```http
  GET /products/find/${id}
```

#### Put product

```http
  PUT /products/update/${id}?Query Params
```

#### Post product

```http
  POST /products/create?Query Params
```

#### Delete product

```http
  DELETE /products/destroy/${id}
```
