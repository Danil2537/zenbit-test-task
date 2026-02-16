## Tech Stack

### Backend
- **Framework:** NestJS  
- **Language:** TypeScript  
- **ORM:** Prisma (with `@prisma/adapter-pg`)  
- **Database:** PostgreSQL  
- **Authentication:** Passport (Local + JWT strategies)  
- **Cloud Storage:** AWS S3 (presigned URLs)  
- **Validation:** class-validator + class-transformer  
- **Testing:** Jest  
- **Linting/Formatting:** ESLint + Prettier  

---

## Backend Endpoints

### User Controller

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/user` | `POST` | Create a new user |

**POST body example:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "optionalUsername",
  "provider": "local"
}
```

###Auth Controller

| Endpoint | Method | Description |
|-----------|--------|-------------|
|`/auth/login`|	`POST`|	Login with local strategy|

Uses LocalAuthGuard.
On success, returns auth response and sets cookies via AuthService.

###Building Controller
| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/building` |	`GET` |	Get all buildings |
| `/building`	| `POST`	| Create a new building |

POST body example:
```json
{
  "id": 1,
  "title": "Skyline Tower",
  "price": 120000,
  "tiket": 100,
  "yield": 12.5,
  "sold": 40,
  "daysLeft": 30,
  "imageURL": "https://example.com/image.jpg"
}
```

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/bucket/:key` |	`GET` |	Generate a presigned URL to access an S3 object |

Response example:
```json
{
  "url": "https://signed-url-to-file"
}
```

## Prisma Schema Overview

### Models
```schema
User
model User {
  id        Int        @id @default(autoincrement())
  email     String
  password  String?
  provider  Providers  @default(local)
}
Building
model Building {
  id        Int    @id @default(autoincrement())
  title     String
  price     Int
  tiket     Int
  yield     Float
  sold      Float
  daysLeft  Int
  imageURL  String
}
```
### Enums
```schema
enum Providers {
  local
  jwt
  google
  github
}
```

## Project Scripts
| Script | Description |

npm run start	Start app
npm run start:dev	Start with watch mode
npm run build	Build project
npm run test	Run unit tests
npm run test:e2e	Run e2e tests
npm run lint	Lint code