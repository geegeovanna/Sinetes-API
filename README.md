# Sinetes de Quarta Asa

API RESTful para gerenciamento de Sinetes inspirada no universo de **Quarta Asa**, desenvolvida com Node.js, Express, TypeScript, Sequelize e PostgreSQL.

O projeto foi desenvolvido originalmente para a disciplina de **Laboratório de Desenvolvimento Web (LDW)** e posteriormente utilizado na disciplina de **Integração e Entrega Contínua (IEC)**, onde foram adicionados recursos de qualidade de código, containerização, Docker Compose, Husky e integração contínua com GitHub Actions.

---

## Sobre o projeto

A aplicação permite cadastrar e gerenciar Sinetes, representando diferentes poderes e características do universo de Quarta Asa.

Cada Sinete possui informações como:

- Nome
- Descrição
- Categoria
- Nível de perigo
- Indicação se é raro

A API disponibiliza operações completas de CRUD e possui documentação interativa utilizando Swagger UI.

Na etapa de IEC, o projeto recebeu uma infraestrutura baseada em Docker, além de verificações automáticas de qualidade e uma esteira de integração contínua.

---

## Tecnologias utilizadas

### Backend

- Node.js
- Express
- TypeScript
- Sequelize
- PostgreSQL
- CORS
- Swagger UI
- OpenAPI

### Qualidade e desenvolvimento

- ESLint
- Prettier
- Husky
- TypeScript Strict Mode

### Infraestrutura e CI

- Docker
- Docker Compose
- GitHub Actions
- pnpm

---

## Estrutura do projeto

```text
Sinetes-API/
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .husky/
│   └── pre-commit
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   │
│   │   ├── controllers/
│   │   │   └── SineteController.ts
│   │   │
│   │   ├── docs/
│   │   │   └── swagger.ts
│   │   │
│   │   ├── models/
│   │   │   └── Sinete.ts
│   │   │
│   │   ├── routes/
│   │   │   └── SineteRoutes.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env.example
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── package.json
│   ├── prettier.config.json
│   └── tsconfig.json
│
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

---

## Laboratório de Desenvolvimento Web — LDW

A primeira etapa do projeto consiste no desenvolvimento de uma API RESTful utilizando arquitetura MVC, persistência relacional com Sequelize e PostgreSQL e documentação interativa com Swagger.

### Arquitetura

A API utiliza uma estrutura baseada no padrão MVC:

- **Models:** representam as entidades e o mapeamento das tabelas utilizando Sequelize.
- **Controllers:** concentram a lógica das operações da API.
- **Routes:** definem os endpoints disponibilizados.
- **Config:** contém as configurações da conexão com o banco.
- **Server:** inicializa a aplicação e realiza a conexão com o banco de dados.

### Entidade Sinete

A entidade principal da aplicação possui os seguintes atributos:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Integer | Identificador único |
| `nome` | String | Nome do Sinete |
| `descricao` | Text | Descrição do poder |
| `categoria` | String | Categoria do Sinete |
| `nivelPerigo` | Integer | Nível de perigo de 1 a 5 |
| `raro` | Boolean | Indica se o Sinete é raro |
| `createdAt` | Date | Data de criação |
| `updatedAt` | Date | Data da última atualização |

### Endpoints

A API utiliza a rota base:

```text
/api/sinetes
```

#### Listar todos os Sinetes

```http
GET /api/sinetes
```

Retorna todos os registros cadastrados.

**Resposta:** `200 OK`

#### Buscar um Sinete

```http
GET /api/sinetes/:id
```

Retorna um Sinete específico pelo seu ID.

**Resposta:** `200 OK`

Caso o registro não seja encontrado:

```text
404 Not Found
```

#### Criar um Sinete

```http
POST /api/sinetes
```

Exemplo de corpo:

```json
{
  "nome": "Manipulação de Sombras",
  "descricao": "Permite ao usuário controlar e moldar sombras ao seu redor.",
  "categoria": "Ofensivo",
  "nivelPerigo": 5,
  "raro": true
}
```

**Resposta:** `201 Created`

#### Atualizar um Sinete

```http
PUT /api/sinetes/:id
```

Permite atualizar os dados de um Sinete existente.

**Resposta:** `200 OK`

#### Remover um Sinete

```http
DELETE /api/sinetes/:id
```

Remove um Sinete pelo seu ID.

**Resposta:** `204 No Content`

### Validações

A API possui validações para os dados recebidos nas requisições.

Entre elas:

- Campos obrigatórios;
- `nivelPerigo` deve ser um número inteiro entre 1 e 5;
- `raro` deve ser booleano;
- Validação do ID informado nas rotas;
- Tratamento de registros inexistentes;
- Tratamento de erros internos.

A API utiliza códigos HTTP semânticos, incluindo:

- `200 OK`
- `201 Created`
- `204 No Content`
- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

Também possui suporte a CORS.

### Banco de dados

O projeto utiliza PostgreSQL com Sequelize ORM.

A conexão é configurada através de variáveis de ambiente.

O projeto permite configurar o uso de SSL através da variável:

```env
DB_SSL=true
```

Para conexões locais ou através do Docker:

```env
DB_SSL=false
```

A tabela `sinetes` é criada automaticamente através da sincronização do Sequelize.

### Configuração do ambiente

#### Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Node.js 24 ou superior
- pnpm 12 ou superior
- PostgreSQL ou acesso a um banco PostgreSQL, como Supabase

Para executar a versão containerizada:

- Docker
- Docker Compose

#### Instalação

Clone o repositório:

```bash
git clone https://github.com/geegeovanna/Sinetes-API.git
```

Entre na pasta do projeto:

```bash
cd Sinetes-API
```

Instale as dependências:

```bash
pnpm install
```

#### Variáveis de ambiente

Na pasta `backend`, copie o arquivo de exemplo:

```text
backend/.env.example
```

para:

```text
backend/.env
```

Configure as variáveis de ambiente de acordo com o banco utilizado.

Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=sinetes
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_SSL=false
```

O arquivo `.env` não é versionado no GitHub.

#### Executando a aplicação

Para executar a aplicação em modo de desenvolvimento:

```bash
pnpm dev
```

A API estará disponível em:

```text
http://localhost:3000
```

A documentação do Swagger estará disponível em:

```text
http://localhost:3000/api-docs
```

### Swagger UI

A aplicação possui documentação interativa utilizando Swagger UI.

Através dela é possível visualizar e executar os endpoints da API utilizando a opção **Try it out**.

Acesse:

```text
http://localhost:3000/api-docs
```

---

## Integração e Entrega Contínua — IEC

Na segunda etapa do projeto, a API desenvolvida na LDW foi reutilizada para implementação de práticas de integração e entrega contínua.

Foram adicionados:

- ESLint;
- Prettier;
- Husky;
- Docker;
- Docker Compose;
- GitHub Actions;
- Verificação automática de tipos;
- Build automatizado.

### ESLint e Prettier

O ESLint é utilizado para identificar problemas no código.

Executar o lint:

```bash
pnpm --dir backend lint
```

O Prettier é utilizado para padronizar a formatação.

Formatar os arquivos:

```bash
pnpm --dir backend format
```

Verificar a formatação:

```bash
pnpm --dir backend format:check
```

### TypeScript e Build

A verificação de tipos pode ser executada com:

```bash
pnpm --dir backend exec tsc --noEmit
```

Para gerar o build de produção:

```bash
pnpm --dir backend build
```

### Husky

O projeto utiliza Husky para executar verificações automaticamente antes de cada commit.

O hook `pre-commit` executa:

```bash
pnpm --dir backend lint
pnpm --dir backend exec tsc --noEmit
```

Dessa forma, caso exista um problema identificado pelo ESLint ou pelo TypeScript, o commit é bloqueado até que o problema seja corrigido.

### Docker

O projeto possui um `Dockerfile` responsável pela criação da imagem da API.

Para construir a imagem:

```bash
docker build -t sinetes-api -f backend/Dockerfile .
```

Para executar a aplicação e o banco utilizando Docker Compose:

```bash
docker compose up -d
```

Para verificar os containers:

```bash
docker compose ps
```

A aplicação será disponibilizada em:

```text
http://localhost:3000
```

O PostgreSQL é executado em um container separado e possui um volume chamado:

```text
postgres_data
```

Esse volume permite manter os dados do banco mesmo quando os containers são recriados.

Para parar os containers:

```bash
docker compose down
```

### Docker Compose

O `docker-compose.yml` configura dois serviços:

- **API:** container responsável pela execução da aplicação Node.js.
- **PostgreSQL:** container responsável pelo banco de dados da aplicação.

A API utiliza o nome do serviço `postgres` como host do banco dentro da rede do Docker.

O PostgreSQL possui um `healthcheck`, e a API aguarda o banco estar saudável antes de iniciar.

### GitHub Actions

O projeto possui uma esteira de integração contínua em:

```text
.github/workflows/ci.yml
```

O workflow é executado automaticamente em:

- `push` para a branch `main`;
- `pull request` para a branch `main`.

As principais etapas da pipeline são:

1. Checkout do código;
2. Configuração do Node.js;
3. Configuração do pnpm;
4. Instalação das dependências;
5. Execução do ESLint;
6. Verificação do TypeScript;
7. Geração do build.

O objetivo é verificar automaticamente se o projeto continua funcionando corretamente após alterações no repositório.

---

## Scripts principais

| Comando | Função |
|---|---|
| `pnpm dev` | Executa a API em modo desenvolvimento |
| `pnpm --dir backend build` | Gera o build de produção |
| `pnpm --dir backend lint` | Executa o ESLint |
| `pnpm --dir backend format` | Formata os arquivos com Prettier |
| `pnpm --dir backend format:check` | Verifica a formatação |
| `pnpm --dir backend exec tsc --noEmit` | Verifica os tipos TypeScript |
| `docker compose up -d` | Inicia API e PostgreSQL |
| `docker compose ps` | Exibe o status dos containers |
| `docker compose down` | Para os containers |
