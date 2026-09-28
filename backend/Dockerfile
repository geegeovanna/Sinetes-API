FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json

RUN pnpm install

COPY backend/tsconfig.json ./backend/tsconfig.json
COPY backend/src ./backend/src

WORKDIR /app/backend

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]