# 🎬 Super Streaming

Um sistema de streaming de vídeo construído com NestJS que suporta upload e reprodução de conteúdo multimídia com streaming adaptativo (range requests).

## 📋 Sobre o Projeto

Super Streaming é uma plataforma de gerenciamento e streaming de conteúdo de vídeo, similar a serviços como Netflix. O projeto oferece funcionalidades para upload de vídeos, gerenciamento de conteúdo (filmes e séries de TV) e streaming otimizado com suporte a reprodução progressiva.

## ✨ Funcionalidades

- 📤 **Upload de Vídeos**: Upload de arquivos de vídeo (MP4) com thumbnails (JPEG)
- 🎥 **Streaming Adaptativo**: Reprodução de vídeo com suporte a HTTP Range Requests
- 🎬 **Gerenciamento de Conteúdo**: Suporte para filmes e séries de TV
- 📺 **Episódios e Temporadas**: Organização de séries com temporadas e episódios
- 🖼️ **Thumbnails**: Sistema de miniaturas para todo o conteúdo
- 🗄️ **Persistência**: Integração com PostgreSQL via Prisma ORM
- 🏗️ **Arquitetura Limpa**: Separação clara entre camadas (entities, services, controllers, repositories)

## 🚀 Tecnologias

- **Runtime**: Node.js
- **Framework**: NestJS
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Upload de Arquivos**: Multer
- **Validação**: class-validator & class-transformer
- **Testes**: Jest & Supertest
- **Containerização**: Docker & Docker Compose

## 📦 Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd super-streaming
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
# Crie um arquivo .env na raiz do projeto
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fakeflix?schema=public" > .env
```

4. **Inicie o banco de dados**

```bash
docker-compose up -d
```

5. **Execute as migrações do Prisma**

```bash
npx prisma migrate dev
# ou
npx prisma db push
```

6. **Inicie a aplicação**

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A aplicação estará disponível em `http://localhost:3000`

## 🎯 Como Usar

### Upload de Vídeo

```bash
curl -X POST http://localhost:3000/content/video \
  -F "video=@/caminho/para/video.mp4" \
  -F "thumbnail=@/caminho/para/thumbnail.jpg" \
  -F "title=Meu Filme" \
  -F "description=Uma descrição incrível"
```

### Streaming de Vídeo

```bash
# Streaming direto
curl http://localhost:3000/stream/{videoId}

# Com range request (playback progressivo)
curl -H "Range: bytes=0-1024" http://localhost:3000/stream/{videoId}
```

## 📁 Estrutura do Projeto

```
super-streaming/
├── database/
│   └── schema.prisma          # Schema do Prisma ORM
├── src/
│   ├── core/                  # Camada de domínio
│   │   ├── entity/           # Entidades de negócio
│   │   ├── exception/        # Exceções customizadas
│   │   └── service/          # Serviços de domínio
│   ├── http/                 # Camada de apresentação
│   │   └── rest/
│   │       ├── controller/   # Controllers REST
│   │       ├── dto/          # Data Transfer Objects
│   │       └── interceptor/  # Interceptors HTTP
│   ├── persistence/          # Camada de persistência
│   │   ├── prisma/          # Configuração do Prisma
│   │   └── repository/       # Repositórios
│   ├── __test__/            # Testes E2E
│   ├── app.module.ts
│   └── main.ts
├── test/                     # Configuração de testes
├── uploads/                  # Arquivos enviados (gerado)
├── docker-compose.yml
└── package.json
```

## 🔌 API Endpoints

### Content Management

| Método | Endpoint         | Descrição                     |
| ------ | ---------------- | ----------------------------- |
| POST   | `/content/video` | Upload de vídeo com thumbnail |

**Request Body (multipart/form-data):**

- `video`: Arquivo de vídeo (MP4)
- `thumbnail`: Imagem thumbnail (JPEG)
- `title`: Título do conteúdo
- `description`: Descrição do conteúdo

**Response:**

```json
{
  "id": "uuid",
  "title": "Título do Vídeo",
  "thumbnailUrl": "uploads/xxx.jpg",
  "videoUrl": "uploads/xxx.mp4",
  "duration": 100,
  "sizeInKb": 5120
}
```

### Media Player

| Método | Endpoint           | Descrição                                    |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/stream/:videoId` | Stream de vídeo com suporte a range requests |

**Headers suportados:**

- `Range`: bytes=start-end (para streaming progressivo)

## 🗄️ Modelo de Dados

O sistema suporta dois tipos de conteúdo:

- **MOVIE**: Filmes individuais
- **TV_SHOW**: Séries de TV com episódios

Cada conteúdo possui:

- Informações básicas (título, descrição, tipo)
- Thumbnail
- Vídeo associado (para filmes) ou episódios (para séries)

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

## 🛠️ Scripts Disponíveis

```bash
npm run start          # Inicia a aplicação
npm run start:dev      # Inicia em modo desenvolvimento (watch)
npm run start:debug    # Inicia em modo debug
npm run build          # Compila o projeto
npm run format         # Formata o código com Prettier
npm run lint:fix       # Corrige problemas de linting
npm run test           # Executa testes unitários
npm run test:e2e       # Executa testes E2E
```

## �️ Prisma - Gerenciamento do Banco de Dados

### O que é `npx prisma db push`?

O comando `npx prisma db push` é uma ferramenta do Prisma que sincroniza o schema do Prisma diretamente com o banco de dados **sem criar arquivos de migração**.

**Quando usar:**

- ✅ Durante o desenvolvimento local para prototipagem rápida
- ✅ Em ambientes de teste/staging
- ✅ Quando você está iterando rapidamente no schema

**Diferença entre `db push` e `migrate`:**

| Comando              | Uso                            | Cria Migrações? | Recomendado para |
| -------------------- | ------------------------------ | --------------- | ---------------- |
| `prisma db push`     | Sincronização rápida do schema | ❌ Não          | Desenvolvimento  |
| `prisma migrate dev` | Cria e aplica migrações        | ✅ Sim          | Produção         |

**Comandos úteis do Prisma:**

```bash
# Sincroniza o schema com o banco (sem migrações)
npx prisma db push

# Cria e aplica migrações (recomendado para produção)
npx prisma migrate dev

# Abre o Prisma Studio (interface visual do banco)
npx prisma studio

# Gera o Prisma Client
npx prisma generate

# Reseta o banco de dados (CUIDADO!)
npx prisma migrate reset
```

## 🪝 Git Hooks - Controle de Qualidade

O projeto utiliza **Husky** e **lint-staged** para automatizar verificações de qualidade antes de commits e pushes, garantindo que apenas código validado seja enviado ao repositório.

### 🔧 Ferramentas Configuradas

- **Husky**: Gerenciador de Git hooks
- **lint-staged**: Executa linters apenas nos arquivos staged (em stage)
- **ESLint**: Linter para TypeScript/JavaScript
- **Prettier**: Formatador de código

### 📋 Pre-commit Hook

Executado **antes de cada commit**. Valida e formata apenas os arquivos que estão no staging area.

**Localização:** `.husky/pre-commit`

**O que executa:**

1. **lint-staged** - Processa arquivos staged:
   - Arquivos `*.ts`: Executa `eslint --fix` (corrige problemas automaticamente)
   - Arquivos `*.{json,html,scss}`: Executa `prettier --write` (formata o código)
2. **Testes unitários** - Executa `npm run test`

**Configuração do lint-staged** (`.lintstagedrc.json`):

```json
{
  "*.ts": "npx eslint --fix",
  "*.{json,html,scss}": "npx prettier --config ./.prettierrc --write"
}
```

### 🚀 Pre-push Hook

Executado **antes de cada push**. Garante que o código está pronto para ser compartilhado.

**Localização:** `.husky/pre-push`

**O que executa:**

1. **ESLint Fix** - Corrige problemas de linting em todo o projeto
2. **Testes Unitários** - Valida que todos os testes passam
3. **Prisma DB Push** - Sincroniza o schema do banco de dados
4. **Testes E2E** - Executa testes end-to-end
5. **Build** - Compila o projeto TypeScript

**Fluxo completo:**

```bash
npm run lint:fix      # Corrige problemas de código
npm run test          # Executa testes unitários
npx prisma db push    # Sincroniza schema do banco
npm run test:e2e      # Executa testes E2E
npm run build         # Compila o projeto
```

### 🎯 Benefícios dos Git Hooks

- ✅ **Qualidade de Código**: Garante padrões de código consistentes
- ✅ **Detecção Precoce**: Identifica problemas antes do push
- ✅ **Automatização**: Evita esquecimentos manuais
- ✅ **Colaboração**: Mantém a base de código limpa para toda equipe
- ✅ **CI/CD Friendly**: Reduz falhas no pipeline de integração contínua

### 🔄 Como Funciona

```mermaid
graph LR
    A[git commit] --> B{Pre-commit Hook}
    B -->|ESLint + Prettier| C[Arquivos Formatados]
    C -->|Testes OK| D[Commit Criado]
    D --> E[git push]
    E --> F{Pre-push Hook}
    F -->|Lint + Testes + Build| G[Push Permitido]
    F -->|Falha| H[Push Bloqueado]
```

### ⚠️ Ignorando Hooks (não recomendado)

Se necessário, você pode pular os hooks:

```bash
# Pular pre-commit
git commit --no-verify -m "mensagem"

# Pular pre-push
git push --no-verify
```

> **⚠️ Atenção**: Pular hooks pode introduzir código com problemas no repositório. Use apenas em casos excepcionais.

### 🛠️ Reinstalando os Hooks

Se os hooks não estiverem funcionando:

```bash
# Reinstala os hooks do Husky
npm run prepare
# ou
npx husky install
```

## �🐳 Docker

O projeto inclui um `docker-compose.yml` para executar o PostgreSQL:

```bash
# Iniciar o banco de dados
docker-compose up -d

# Parar o banco de dados
docker-compose down

# Ver logs
docker-compose logs -f
```

## 📝 Variáveis de Ambiente

| Variável       | Descrição                    | Padrão                                                                 |
| -------------- | ---------------------------- | ---------------------------------------------------------------------- |
| `DATABASE_URL` | URL de conexão do PostgreSQL | `postgresql://postgres:postgres@localhost:5432/fakeflix?schema=public` |
| `PORT`         | Porta da aplicação           | `3000`                                                                 |

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e não possui licença pública.
