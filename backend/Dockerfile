# Etapa 1: Imagem base
FROM node:24-alpine AS base

WORKDIR /app

ENV HUSKY=0

RUN corepack enable && corepack prepare pnpm@12.6.0 --activate

# Etapa 2: Build da aplicação
FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json

RUN pnpm install --frozen-lockfile --filter backend...

COPY backend/tsconfig.json ./backend/tsconfig.json
COPY backend/src ./backend/src

RUN pnpm --filter backend build

# Etapa 3: Imagem de produção
FROM base AS production

ENV NODE_ENV=production

ENV HUSKY=0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json

RUN pnpm install --frozen-lockfile --prod --filter backend --ignore-scripts

COPY --from=build /app/backend/dist ./backend/dist

WORKDIR /app/backend

EXPOSE 3000

CMD ["node", "dist/server.js"]
