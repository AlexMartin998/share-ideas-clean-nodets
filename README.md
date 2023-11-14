# Share your Ideas App | Hexagonal Architecture with Node.js

## Features

⚡️ Node.js\
⚡️ Express.js\
⚡️ TypeScript\
⚡️ Clean Architecture\
⚡️ PostgreSQL and PrismaORM\
⚡️ Dependency Injection with Awilix as container of DI\
⚡️ Docker

## Running the app

### Dev Env

#### Create .env file based on .env.template

```bash
touch .env
touch .env.dev
```

#### Dev containers - VS Code

1. Install [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension in VS Code

2. Add your host user

```bash
export DOCKER_USER="$(id -u):$(id -g)"
```

3. Run `docker-compose.devcontainers.yml`

```bash
docker compose -f docker-compose.devcontainers.yml up --build
```

4. Attach to Running Container
   1. Press down: `Ctrl + Shift + P`
   2. Search: `Dev Containers: Attach to Running Container`
   3. Select `/ideas` container
   4. New VS Code window will open, so open the folder project: `/code/`
   5. Close the remote connections in VS Code
   6. Stop and remove containers, networks

#### Dev mode

Make sure that you have Node.js installed in your divece.

- Install all dependencies

```bash
# pnpm
npm i -g pnpm

# app deps
pnpm install
```

- Run the app in dev mode

```bash
docker compose -f docker-compose.dev.yml up --build

pnpx prisma migrate dev
pnpx prisma generate
```

- Stop and remove containers, networks

```bash
docker compose -f docker-compose.dev.yml down
```

### Executing SEED

```bash
# HTTP Get request

curl http://localhost:3000/api/seed
```

### Prod Env

- Configure the app to run in prod

- Running the app

```bash
# compose
docker compose up --build
```
