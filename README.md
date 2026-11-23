# DRACONIS — Sinetes de Quarta Asa

Aplicação web para cadastro, consulta e gerenciamento de Sinetes inspirada no universo de **Quarta Asa**, desenvolvida em arquitetura monorepo com React, TypeScript, Node.js, Express, Sequelize e PostgreSQL.

O projeto foi desenvolvido originalmente para a disciplina de **Laboratório de Desenvolvimento Web (LDW)**, contemplando o desenvolvimento de uma API RESTful e de uma aplicação frontend integrada. Posteriormente, foi utilizado na disciplina de **Integração e Entrega Contínua (IEC)**, onde foram adicionados recursos de qualidade de código, containerização, Docker Compose, Husky e integração contínua com GitHub Actions.

---

## Sobre o projeto

O DRACONIS é uma aplicação web que permite cadastrar, consultar e gerenciar Sinetes, representando diferentes poderes e características do universo de Quarta Asa.

Cada Sinete possui informações como:

- Nome;
- Descrição;
- Categoria;
- Nível de perigo;
- Indicação se é raro.

O projeto é organizado em um monorepo, composto por duas aplicações principais:

- **Frontend:** interface web desenvolvida com React e TypeScript, responsável pela apresentação e interação do usuário com os Sinetes.
- **Backend:** API RESTful desenvolvida com Node.js, Express e TypeScript, responsável pelas regras de negócio, operações CRUD e persistência dos dados no PostgreSQL.

A comunicação entre as aplicações é realizada por meio de requisições HTTP, utilizando uma camada de serviços no frontend para consumir os endpoints disponibilizados pela API.

O backend também possui documentação interativa utilizando Swagger UI.

Na etapa de IEC, o projeto recebeu uma infraestrutura baseada em Docker, além de verificações automáticas de qualidade e uma esteira de integração contínua.

## Tecnologias utilizadas

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Lucide React
- Sonner

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
│   │   ├── controllers/
│   │   │   └── SineteController.ts
│   │   ├── docs/
│   │   │   └── swagger.ts
│   │   ├── models/
│   │   │   └── Sinete.ts
│   │   ├── routes/
│   │   │   └── SineteRoutes.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── package.json
│   ├── prettier.config.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── ui/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── vite.config.ts
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

A primeira etapa do projeto consiste no desenvolvimento de uma aplicação web organizada em arquitetura monorepo, integrando um frontend desenvolvido com React e TypeScript a uma API RESTful construída com Node.js, Express e TypeScript.

O backend utiliza arquitetura MVC, persistência relacional com Sequelize e PostgreSQL e documentação interativa com Swagger UI. O frontend disponibiliza a interface para consulta e gerenciamento dos Sinetes, consumindo os recursos da API por meio de uma camada de serviços.

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

### Frontend

A aplicação frontend do DRACONIS foi desenvolvida com React e TypeScript, utilizando Vite como ferramenta de desenvolvimento e build.

A interface possui uma identidade visual inspirada no universo de Quarta Asa, com uma temática de fantasia medieval, elementos visuais relacionados aos Sinetes e uma apresentação voltada à organização e gerenciamento dos registros.

A aplicação está organizada em componentes reutilizáveis e possui as seguintes áreas principais:

- **Página inicial:** apresenta o universo DRACONIS, introduz os Sinetes e organiza suas categorias.
- **Gerenciamento:** disponibiliza funcionalidades para cadastrar, consultar, editar e remover Sinetes.

#### Organização do frontend

- **Components:** componentes reutilizáveis da interface.
- **Layouts:** estruturas compartilhadas entre as páginas.
- **Pages:** páginas principais da aplicação.
- **Services:** camada responsável pela comunicação com a API.
- **Types:** definições de tipos e interfaces TypeScript.
- **Assets:** imagens e recursos visuais utilizados na aplicação.
- **Lib:** funções auxiliares e utilitários.

#### Integração com a API

A comunicação entre frontend e backend é realizada por meio do serviço `sineteService.ts`, responsável por centralizar as requisições HTTP relacionadas aos Sinetes.

A URL base da API é configurada através da variável de ambiente `VITE_API_URL`.

Exemplo:

```env
VITE_API_URL=http://localhost:3000
```

O frontend utiliza os endpoints disponibilizados pelo backend para realizar as operações de CRUD, mantendo a comunicação entre as duas aplicações.

### Banco de dados

O projeto utiliza **PostgreSQL** como banco de dados e **Sequelize ORM** para realizar o mapeamento e a persistência dos dados.

Na atividade de **LDW**, o PostgreSQL foi utilizado por meio do **Supabase**, que disponibiliza uma instância PostgreSQL hospedada. A aplicação se conecta ao banco utilizando as credenciais configuradas no arquivo `.env`.

Na atividade de **IEC**, foi adicionada uma configuração alternativa utilizando **PostgreSQL em container Docker**, através do Docker Compose. Dessa forma, a aplicação pode ser executada de forma containerizada sem depender do banco hospedado no Supabase.

A conexão com o banco é configurada através de variáveis de ambiente, incluindo a configuração de SSL por meio da variável `DB_SSL`.

Para uma conexão com o Supabase:

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

Entre na pasta do backend:

```bash
cd backend
```

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

#### Executando o frontend

Com as dependências instaladas na raiz do monorepo, configure o ambiente do frontend.

Na pasta `frontend`, copie o arquivo `.env.example` para `.env` e configure a URL da API:

```env
VITE_API_URL=http://localhost:3000
```

Para iniciar o frontend em modo de desenvolvimento, execute na raiz do projeto:

```bash
pnpm --dir frontend dev
```

A aplicação estará disponível no endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

Certifique-se de que o backend esteja em execução para que o frontend consiga realizar as operações de consulta e gerenciamento dos Sinetes.

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

O projeto possui uma esteira de integração e entrega contínua (CI/CD), configurada em:

```text
.github/workflows/ci.yml
```

O workflow é executado automaticamente em:

- `push` para a branch `main`;
- `pull request` direcionado à branch `main`.

As principais etapas da pipeline são:

1. Checkout do código;
2. Configuração do Node.js 24;
3. Configuração do pnpm 12.6.0;
4. Instalação das dependências do backend;
5. Execução do ESLint;
6. Verificação dos tipos com TypeScript;
7. Build de produção do backend;
8. Construção da imagem Docker.

Após a conclusão das verificações, quando ocorre um `push` na branch `main`, o GitHub Actions utiliza o **Render Deploy Hook** para solicitar um novo deploy da API.

O Deploy Hook é armazenado como um segredo do repositório no GitHub Actions (`RENDER_DEPLOY_HOOK_URL`), evitando a exposição da URL de implantação no código-fonte.

O serviço no Render utiliza o recurso Docker e permanece com o Auto-Deploy desativado. Dessa forma, as implantações são controladas pela pipeline configurada no GitHub Actions.

### Deploy em produção — Render

A API está publicada no Render, utilizando uma imagem Docker construída a partir do `backend/Dockerfile`.

**URL pública:**

```text
https://draconis-api.onrender.com
```

**Principais endpoints:**

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/health` | Verifica a disponibilidade da API |
| `GET` | `/api/sinetes` | Lista todos os Sinetes |
| `GET` | `/api/sinetes/:id` | Busca um Sinete pelo ID |
| `POST` | `/api/sinetes` | Cadastra um Sinete |
| `PUT` | `/api/sinetes/:id` | Atualiza um Sinete |
| `DELETE` | `/api/sinetes/:id` | Remove um Sinete |

**Health Check:**

```http
GET https://draconis-api.onrender.com/api/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "uptime": 120
}
```

O valor de `uptime` representa o tempo de execução do processo em segundos e varia conforme o tempo de atividade da aplicação.

**Documentação Swagger:**

```text
https://draconis-api.onrender.com/api-docs
```

### Configuração do ambiente de produção

No Render, as variáveis de ambiente são configuradas diretamente nas configurações do serviço, sem necessidade de armazenar credenciais no repositório.

As principais configurações utilizadas são:

- `NODE_ENV`: ambiente de produção;
- `DB_HOST`: endereço do servidor PostgreSQL;
- `DB_PORT`: porta de conexão;
- `DB_NAME`: nome do banco de dados;
- `DB_USER`: usuário do banco;
- `DB_PASSWORD`: senha do banco;
- `DB_SSL`: habilita a conexão SSL.

A variável `PORT` é fornecida automaticamente pelo Render. A aplicação utiliza essa variável para definir a porta de execução, com fallback para a porta `3000`.

A conexão com o PostgreSQL utiliza SSL quando `DB_SSL=true`.

### Fluxo de entrega contínua

O processo de implantação segue o fluxo:

1. O código é enviado para a branch `main`;
2. O GitHub Actions inicia a pipeline;
3. São executadas as verificações de qualidade, tipagem e build;
4. A imagem Docker é construída;
5. Se todas as etapas forem concluídas com sucesso, o Deploy Hook solicita a implantação no Render;
6. O Render constrói e publica a nova versão da API;
7. O endpoint `/api/health` é utilizado para verificar a disponibilidade do serviço.

Esse processo permite automatizar a entrega da aplicação, mantendo as verificações de qualidade antes da implantação em produção.

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
