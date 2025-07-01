Se quiser ler em português, [clique aqui](https://github.com/caiobuteri/brain-agriculture/blob/main/readme-ptBR.md)

# 🌾 Brain Agriculture API

**Brain Agriculture** is a RESTful API developed with NestJS to manage rural producers, farms, harvests, and crops, also providing analytical data for dashboards.

## 📚 Table of Contents

- [Technologies Used](#tecnologias-utilizadas)
- [Features](#funcionalidades)
- [Installation](#instalação)
- [Development Environment](#ambiente-de-desenvolvimento)
- [Running the Project](#execução-do-projeto)
- [API Documentation](#documentação-da-api)
- [Data Seeding](#seed-de-dados)
- [Testing](#testes)
- [Entity Diagram](#diagrama-de-entidades)
- [Authors](#autores)

---

## 🛠 Technologies Used

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **TypeORM**
- **Swagger (OpenAPI)**
- **Jest** (for testing)
- **Docker** (optional, for containerized environment)

---

## 🚀 Features

### 👨‍🌾 Producers

- Create, list, fetch by ID, and delete producers.

### 🌱 Farms

- Create, list, fetch by ID, and delete farms.
- Linked to producers.
- Stores information such as total area, cultivable area, and vegetation.

### 🌾 Harvests

- Create, list, fetch by ID, and delete harvests.
- Each harvest belongs to a farm and has a year.
- Unique constraint per farm + year (only if deletedAt is NULL).

### 🌽 Crops

- Create, list, fetch by ID, and delete crops.
- Each crop is linked to a harvest.
- Unique constraint per name + harvest (also considering deletedAt).

### 📊 Dashboard

- Total number of registered farms.
- Total hectares recorded.
- Pie charts:
  - By state.
  - By planted crop.
  - By land use (cultivable area vs. vegetation).

---

## 🧠 Brain Agriculture – Version 2 (V2)

The new version of the project brings concrete improvements in security, DevOps, deployment, and best practices, raising the application's maturity for a production environment.

### 🔐 Security

- JWT Authentication: Secure authentication implemented using @nestjs/jwt, integrated with NestJS guards.
- Access Control with RolesGuard: Simple RBAC implementation using decorators (@Roles()) and a custom RolesGuard to control permissions based on user roles.
- Protected Environment Variables: Centralized management and validation of environment variables like JWT_SECRET, with fallback and proper checks.
- Helmet Usage: HTTP headers configured to enhance protection against common attacks.
- CORS Configuration: Backend access restricted to authorized domains.
- Basic Rate Limiting: Request throttling configured to prevent abuse.

### ⚙️ DevOps

- CI with GitHub Actions:
  - Automated workflow for installing dependencies, building, and testing the application on pushes and pull requests to the main branch.
  - Dependency caching strategy to speed up builds.
  - CI environment configured for Node.js 22.x.
- Separate Dev Environment:
  - Specific workflow added for validations on development branches (e.g., dev).
- Deployment via Railway:
  - Production environment deployed at:
    - https://brain-agriculture-production-bb20.up.railway.app
  - Development environment deployed at:
    - https://brain-agriculture-develop.up.railway.app
- Environment-Specific Variables.
  - Separate configuration for each environment.
- Centralized Logs: Provided by the platform:
- Docker Environment Separation:
  - docker-compose.prod.yml file for production using an optimized image.

## ✅ Implemented Tests

The application has been tested with a focus on reliability, code quality, and real production behavior. Below are the types of tests implemented:

### 🧪 Unit and Integration Tests

- Full coverage of the main services:
  - `AuthService`
  - `UsersService`
  - `ProducersService`
- Robust mocks using jest.fn() simulating:
  - TypeORM repositories
  - Transactions using `DataSource`
- Positive and negative cases:
  - Creation with duplicated CPF
  - Login with invalid credentials
- Cleanup and state control using `DataSource`
- Coverage report generated with:

```bash
yarn test --coverage
```

### 📦 E2E Tests with Supertest

- Superadmin authentication (/auth/login)
- Authenticated admin creation (/auth/register)
- Tests validating JWT and role-based protection (SUPERADMIN)
- Test data cleanup using DataSource (prevents database pollution on Railway)
- Environment configured to run E2E tests in the development CI

### ⚙️ Load Testing (in progress)

- To be implemented with Artillery
- Simulation of multiple simultaneous logins
- Analysis of response time, throughput, and stability under load

### 🤝 Contract Testing (in progress)

- Planned with Pact
- Contract validation between AuthService (provider) and frontend (consumer)
- Ensures that backend changes do not break integration
  
---

## 🌐 API Online

Access the production API:

🔗 [https://brain-agriculture-production-bb20.up.railway.app](https://brain-agriculture-production-bb20.up.railway.app)

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/caiobuteri/brain-agriculture.git
cd brain-agriculture
```

2. Install the dependencies:

```bash
yarn install
```

3. Configure the PostgreSQL database in the .env file:

```ts
DB_HOST = 'localhost';
DB_PORT = '5432';
DB_NAME = 'brain_agriculture';
DB_USERNAME = 'postgres';
DB_PASSWORD = 'asdf1234';
DB_SCHEMA = 'public';
```

## 💻 Development Environment

1. Run the migrations to create tables and populate the database with sample data:

```bash
yarn migration:run
```

2. Start the server:

```ts
yarn start:dev
```

## 📖 API Documentation

The documentation is automatically available at:

> [https://brain-agriculture-production-bb20.up.railway.app/api](https://brain-agriculture-production-bb20.up.railway.app/api)

It is generated using Swagger (OpenAPI) and includes:

- All available routes
- Expected data types (DTOs)
- Expected responses
- HTTP status codes
- Tags organized by module

### 📦 Example of project configuration

Swagger is configured in the application's `main.ts` file using `DocumentBuilder`:

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

## 🌱 Data Seeding

For testing and development purposes, the project includes a migration that automatically populates the database with realistic and domain-consistent data:

- **3 producers** with simulated real names
- **Each producer** has between **1 to 2 farms**
- **Each farm** has between **1 to 3 harvests**
- **Each harvest** contains **1 to 2 crops**

> 📌 **Note:** When running TypeORM migrations, this data structure will be automatically inserted into the database.  
> You don't need to worry about manually inserting the initial records.

## 🗺 Entity Diagram

## 🧩 Entity-Relationship (ER) Diagram

![alt text](image.png)

## 👨‍💻 Authors

Developed by:
_Caio Buteri_
