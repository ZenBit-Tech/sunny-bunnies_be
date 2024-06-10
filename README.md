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

  user_profiles {
    int id PK
    int user_id FK
    enum role
    varchar phone_number
    varchar profile_photo
    varchar address_line_1
    varchar address_line_2
    varchar country
    varchar state
    varchar city
    varchar clothes_size
    varchar jeans_size
    varchar shoe_size
    varchar card_number
    varchar expire_date
    varchar cvv_code
    boolean registration_completed
    dateTime created_at
    dateTime updated_at
  }

  brands {
    int id PK
    varchar name
  }

  colors {
    int id PK
    varchar name
  }

  product_images {
    int id PK
    varchar url
    varchar description
    dateTime created_at
  }

  materials {
    int id PK
    varchar name
  }

  sizes {
    int id PK
    varchar name
  }

  styles {
    int id PK
    varchar name
  }

  categories {
    int id PK
    varchar category
  }

  PRODUCTS {
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

  PRODUCTS ||--o{ PRODUCT_IMAGES : "has"
  PRODUCTS ||--o{ SIZES : "has"
  PRODUCTS ||--o{ CATEGORIES : "has"
  PRODUCTS ||--o{ COLORS : "has"
  PRODUCTS ||--o{ STYLES : "has"
  PRODUCTS ||--o{ BRANDS : "has"
  PRODUCTS ||--o{ MATERIALS : "has"
```