
# My Api Store


This is a back-end project developed with:

- [deno js](https://deno.land/)

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

### USERS

#### Get all users

```http
  GET /users
```

#### Get user

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Post user

```http
  POST /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of user to save |
| `email`      | `string` | **Required**. User email to save, must be unique |
| `password`      | `string` | **Required**. Password of user to save |
| `direction`      | `string` | **Required**. Direction of user to save |
| `phone`      | `string` | **Required**. Phone of user to save |
| `photo`      | `string` | **Required**. Photo of user to save |

#### Put user

```http
  PUT /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to update |
| `{data}`      |  | **Required**. Data for update user |

#### Delete user

```http
  DELETE /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of string to delete |

