# Zenbit Internship Test Task

A small full-stack TypeScript web application built with NestJS (backend) and Next.js (frontend), featuring pages for root, login, signup, and a protected building display when logged in. Backend featuring api for retrieving images from cloudflare r2 bucket, cerating users, retrieving building objects from supabase postgres db through prisma, as well as httpOnly cookie jwt-based auth.

---

# Project Requirements

- Create a **Main Page** and **Login/Signup forms**.
- Frontend:
  - Open page with mobile adaptation.
  - Implement using **React** and **Redux**.
- Backend:
  - Create an open API that accepts applications and stores them in the database.
  - Implement authentication with **httpOnly cookies**.
- Notes:
  - After login, the header should hide login/register buttons.
  - Upload the application to any server.
  - Submit links to the live app and GitHub repository.
  - Demonstrate your approach, user-focused thinking, and problem-solving.

Design reference: [Figma Design](https://www.figma.com/file/OmpRyHggnkIZ7Qr1c5o5gg/Untitled?type=design&node-id=7965-2&mode=design&t=sK1qga9e8bjQqN6B-0)

---

# Tech Stack

### Backend
- **Framework:** NestJS  
- **Language:** TypeScript  
- **ORM:** Prisma (`@prisma/adapter-pg`)  
- **Database:** PostgreSQL  
- **Authentication:** Passport (Local + JWT) with httpOnly cookies  
- **Cloud Storage:** AWS S3 (presigned URLs)  
- **Validation:** class-validator + class-transformer  
- **Testing:** Jest  
- **Linting/Formatting:** ESLint + Prettier  

### Frontend
- **Framework:** Next.js (App Router)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **State Management:** Redux Toolkit  
- **Forms:** Server Actions + `useActionState`  
- **Images:** Next.js Image optimization  
- **Linting/Formatting:** ESLint + Prettier  

---

# Backend Overview

## API Controllers & Endpoints

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

## Auth Controller

| Endpoint      | Method | Description |
|---------------|--------|-------------|
| `/auth/login` | POST   | Login with `LocalAuthGuard`. On success: sets httpOnly JWT cookie and returns auth response. |

**Note:** Guards ensure protected routes can only be accessed by authenticated users.

---

## Building Controller

| Endpoint     | Method | Description        |
|--------------|--------|------------------|
| `/building`  | GET    | Get all buildings |
| `/building`  | POST   | Create a new building |

**POST body example:**
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

# S3 Presigned URL

## Endpoint

| Endpoint      | Method | Description                           |
|---------------|--------|---------------------------------------|
| `/bucket/:key` | GET    | Generate a presigned URL to access an S3 object |

### Response Example

```json
{
  "url": "https://signed-url-to-file"
}
```

## Prisma Schema Overview
### Models
```prisma
model User {
  id        Int        @id @default(autoincrement())
  email     String
  password  String?
  provider  Providers  @default(local)
}

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
```prisma
enum Providers {
  local
  jwt
  google
  github
}
```

---

# Frontend Overview
## Structure
app
├─ auth       # login, signup, auth logic
├─ buildings  # building domain
├─ shared     # reusable components & utils
├─ store      # redux store & slices
├─ layout.tsx
└─ page.tsx

## Pages

### Home
- Hero section with background image
- "Open Deals" list (protected by AuthGuard); Fetches city image + building data from API

### Login
- Server Action submit for login
- Redux stores image + UI state
- Password visibility toggle

### Signup
- Client-side validation (email + password)
- Server Action for user creation

## Redux Slices
- auth --> authentication state (logged in/out, JWT cookie)
- rootPage --> buildings + hero image
- loginPage --> login form UI state
- signupPage --> validation + UI state

### Core Components
- Header --> responsive navigation, shows/hides buttons based on auth
- AuthGuard --> wraps protected pages
- BuildingDisplay --> building card with info from backend

## Features
- Full App Router architecture
- Server Actions for mutations
- Feature-based folder structure
- Auth-protected UI
- Optimized images via Next.js Image component
- Responsive design for mobile & desktop

## Project Scripts
| Script | Description |
|---------------|----------------------------|
| npm run start | Start backend/frontend app |
| npm run start:dev |	Start with watch mode |
| npm run build | Build project |
| npm run lint | Lint code with ESLint |
| npm run format | Format code with Prettier |