# 🌾 Brain Agriculture API

A **Brain Agriculture** é uma API RESTful desenvolvida com NestJS para gerenciar produtores rurais, fazendas, safras e culturas agrícolas, fornecendo também dados analíticos para dashboards.

## 📚 Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
- [Execução do Projeto](#execução-do-projeto)
- [Documentação da API](#documentação-da-api)
- [Seed de Dados](#seed-de-dados)
- [Testes](#testes)
- [Diagrama de Entidades](#diagrama-de-entidades)
- [Autores](#autores)

---

## 🛠 Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **TypeORM**
- **Swagger (OpenAPI)**
- **Jest** (para testes)
- **Docker** (opcional, para ambiente containerizado)

---

## 🚀 Funcionalidades

### 👨‍🌾 Produtores (Producers)

- Criar, listar, buscar por ID e excluir produtores.

### 🌱 Fazendas (Farms)

- Criar, listar, buscar por ID e excluir fazendas.
- Relacionamento com produtores.
- Armazena informações como área total, área cultivável e vegetação.

### 🌾 Safras (Harvests)

- Criar, listar, buscar por ID e excluir safras.
- Cada safra pertence a uma fazenda e possui um ano.
- Constraint única por fazenda + ano (apenas se `deletedAt` for `NULL`).

### 🌽 Culturas (Crops)

- Criar, listar, buscar por ID e excluir culturas.
- Cada cultura está ligada a uma safra.
- Constraint única por nome + safra (também considerando `deletedAt`).

### 📊 Dashboard

- Total de fazendas cadastradas.
- Total de hectares registrados.
- Gráficos de pizza:
  - Por estado.
  - Por cultura plantada.
  - Por uso do solo (área agricultável vs vegetação).

---

## 🧠 Brain Agriculture – Versão 2 (V2)

A nova versão do projeto traz melhorias concretas nas áreas de segurança, DevOps, deploy e boas práticas, elevando a maturidade da aplicação para o ambiente de produção.

### 🔐 Segurança

- Autenticação com JWT: Implementação de autenticação segura utilizando @nestjs/jwt, com integração aos guards do NestJS.
- Controle de acesso com RolesGuard: Implementação de RBAC simples com decorators (@Roles()) e um RolesGuard customizado para controle de permissões por perfil de usuário.
- Variáveis de ambiente protegidas: Centralização e verificação do uso de variáveis como JWT_SECRET com fallback e validações adequadas.
- Uso de Helmet: Configuração de headers HTTP para reforço da segurança contra ataques comuns.
- CORS configurado: Acesso ao backend limitado aos domínios autorizados.
- Rate limiting básico: Prevenção de abusos com configuração de limitação de requisições.

### ⚙️ DevOps

- CI com GitHub Actions:
  - Workflow automatizado para instalação, build e testes da aplicação em pushes e pull requests na branch main.
  - Estratégia de cache de dependências para acelerar os builds.
  - Ambiente de CI configurado para Node.js 22.x.
- Criação de ambiente dev separado: Adição de workflow específico para validações em branches de desenvolvimento (ex: dev).
- Deploy via Railway:
  - Ambiente de produção publicado com domínio:
  - https://brain-agriculture-production-bb20.up.railway.app
  - Ambiente de desenvolvimento publicado com domínio:
  - https://brain-agriculture-develop.up.railway.app
- Configuração de variáveis de ambiente por ambiente.
- Logs centralizados fornecidos pela plataforma.
- Separação de ambientes no Docker:
- Arquivo docker-compose.prod.yml para produção com imagem otimizada.

## ✅ Testes Implementados

A aplicação foi testada com foco em confiabilidade, qualidade de código e comportamento real em produção. Abaixo estão os tipos de testes implementados:

### 🧪 Testes Unitários e de Integração

- Cobertura completa dos principais serviços:
  - `AuthService`
  - `UsersService`
  - `ProducersService`
- Mocks robustos com `jest.fn()` e simulação de:
  - Repositórios do TypeORM
  - Transações com `DataSource`
- Casos positivos e negativos:
  - Criação com CPF duplicado
  - Login com credenciais inválidas
- Limpeza e controle de estado com `DataSource`
- Relatório de cobertura gerado com:

```bash
yarn test --coverage
```

### 📦 Testes E2E com Supertest

- Autenticação de superadmin (/auth/login)
- Criação de novo admin autenticado (/auth/register)
- Testes com validação de JWT e proteção por role (SUPERADMIN)
- Limpeza de dados de teste usando DataSource (evita poluição do banco Railway)
- Ambiente configurado para executar os testes E2E no CI de desenvolvimento

### ⚙️ Testes de carga (em andamento)

- Será implementado com Artillery
- Simulação de múltiplos logins simultâneos
- Análise de tempo de resposta, throughput e estabilidade sob carga

### 🤝 Testes de contrato (em andamento)

- Planejado com Pact
- Validação dos contratos entre AuthService (provider) e o frontend (consumer)
- Garante que mudanças no backend não quebrem a integração

---

## 🌐 API Online

Acesse a API em produção:

🔗 [https://brain-agriculture-production-bb20.up.railway.app](https://brain-agriculture-production-bb20.up.railway.app)

---

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/caiobuteri/brain-agriculture.git
cd brain-agriculture
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure o banco de dados PostgreSQL no arquivo .env:

```ts
DB_HOST = 'localhost';
DB_PORT = '5432';
DB_NAME = 'brain_agriculture';
DB_USERNAME = 'postgres';
DB_PASSWORD = 'asdf1234';
DB_SCHEMA = 'public';
```

## 💻 Ambiente de Desenvolvimento

1. Rode as migrations para criação das tabelas + população do banco com dados de exemplo:

```bash
yarn migration:run
```

2. Inicie o servidor:

```ts
yarn start:dev
```

## 📖 Documentação da API

A documentação está disponível automaticamente em:

> [https://brain-agriculture-production-bb20.up.railway.app/api](https://brain-agriculture-production-bb20.up.railway.app/api)

Ela é gerada com **Swagger (OpenAPI)** e inclui:

- Todas as rotas disponíveis
- Tipos de dados esperados (DTOs)
- Respostas esperadas
- Códigos de status HTTP
- Tags organizadas por módulo

### 📦 Exemplo de configuração no projeto

O Swagger é configurado no `main.ts` da aplicação NestJS utilizando o `DocumentBuilder`:

```ts
const config = new DocumentBuilder()
  .setTitle('Brain Agriculture Documentation')
  .setDescription('The Brain Agriculture API Documentation')
  .setVersion('1.0')
  .addTag('brain-agriculture')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

## 🌱 Seed de Dados

Para fins de testes e desenvolvimento, o projeto inclui uma migration responsável por popular automaticamente o banco com dados realistas e coerentes com o domínio da aplicação:

- **3 produtores** com dados simulando nomes reais
- **Cada produtor** possui entre **1 a 2 fazendas**
- **Cada fazenda** possui entre **1 a 3 safras**
- **Cada safra** contém **1 a 2 culturas (crops)**

> 📌 **Observação:** Ao executar as migrations do TypeORM, essa estrutura de dados já será inserida automaticamente no banco de dados.  
> Você não precisa se preocupar em inserir manualmente os registros iniciais.

## ✅ Testes

Executar todos os testes automatizados com:

```bash
yarn test
```

Você pode rodar um teste específico:

```bash
yarn test src/farms/farms.service.spec.ts
```

## 🗺 Diagrama de Entidades

## 🧩 Diagrama Entidade-Relacionamento (ER)

![alt text](image.png)

## 👨‍💻 Autores

Desenvolvido por:

_Caio Buteri_
