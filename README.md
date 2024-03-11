### Features

- Get all users
- Create new user (register)
- Update user email and username
- Delete user

### Prerequisites

**Node version 20.x**

### Cloning the repository

```shell
git clone https://github.com/aungpyaephyo1412/express-ts-mongo.git
```

### Install packages

```shell
pnpm i
```

### Setup MongoDB URL

In `.env`:

```.dotenv
PORT=*******
MONGO_URL = *****************************
API_VERSION=***********
TOKEN_SECRET = **************************
```

### Start the index

```shell
pnpm dev
```

## Available commands

Running commands with npm `pnpm [command]`

| command | description          |
| :------ | :------------------- |
| `dev`   | Starts a development |
| `build` | Build the api        |
