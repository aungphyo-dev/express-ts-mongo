### Features

- Get all users
- Create new user (register)
- Update user email and username
- Delete user

### Prerequisites

**Node version 18.x**

### Cloning the repository

```shell
git clone https://github.com/aungpyaephyo1412/express-ts-template.git
```

### Install packages

```shell
pnpm i
```

### Setup MongoDB URL

In `.env`:

```.dotenv
TOKEN_SECRET = **************************
MONGO_URL = *****************************
PORT=*******
API_VERSION=***********
```

### Start the index

```shell
pnpm start
```

## Available commands

Running commands with npm `pnpm [command]`

| command | description          |
| :------ | :------------------- |
| `dev`   | Starts a development |
| `build` | Build the api        |
