### 1. Backend

#### 1.1 Technologies

- [Nest.js](https://nestjs.com/) - a backend framework.
- [TypeOrm](https://typeorm.io/) - an ORM.

#### 1.2 Folder Structure

1. common - holds shared components, constants, decorators, exceptions, guards, interfaces, middlewares, pipes, serializers, and validations.
2. migrations - holds migration files.
3. modules - holds modules, services, repositories, dto etc.

## 2. How to Run

### 2.1 Manually

_To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

1. Install dependencies: **`npm install`**.
2. Create docker image: **`docker compose up`**
3. Run all migrations: **`npm run migration:run`**
4. Run all seeds: **`npm run seed`**
5. Start the server: **`npm run start`**

### 3. Branch Flow

Use `npm run format` and `npm run lint`. It automatically corrects a certain number of errors.

```
<type>-<short-desc>
```

Examples:

- `feature-add-dashboard`
- `feature-add-user-flow`
- `fix-user-flow`

### 4. DB schema

```mermaid
erDiagram

  users {
    int id PK
    varchar name
    varchar email
    text password_hash
    text password_salt
    dateTime created_at
    dateTime updated_at
  }

  brand {
    int id PK
    varchar name
  }

  color {
    int id PK
    varchar name
  }

  image {
    int id PK
    varchar url
    varchar description
    dateTime created_at
  }

  material {
    int id PK
    varchar name
  }

  size {
    int id PK
    varchar name
  }

  style {
    int id PK
    varchar name
  }

  category {
    int id PK
    varchar category
  }

  PRODUCT {
    int id PK
    varchar name
    varchar description
    int quantity
    gender 
    status 
    decimal priceFrom
    decimal priceTo
    dateTime createdAt
    dateTime updatedAt
  }

  PRODUCT ||--o{ IMAGE : "has"
  PRODUCT ||--o{ SIZE : "has"
  PRODUCT ||--o{ CATEGORY : "has"
  PRODUCT ||--o{ COLOR : "has"
  PRODUCT ||--o{ STYLE : "has"
  PRODUCT ||--o{ BRAND : "has"
  PRODUCT ||--o{ MATERIAL : "has"
```