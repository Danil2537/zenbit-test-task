# Zenbit Internship Test Task

A small full-stack TypeScript web application built with NestJS (backend) and Next.js (frontend), featuring pages for root, login, signup, and a protected building display when logged in. The backend provides APIs to retrieve images from a Cloudflare R2 bucket, create users, and fetch building objects from a PostgreSQL database using Prisma, as well as httpOnly cookie jwt-based auth.
- [App Client](https://zenbit-internship-test-task.netlify.app/) 
- [App API](https://zenbit-test-task-lu1k.onrender.com/)  

---

# Project Requirements

**Create a Main page and login form**

***Frontend technical points:***
Make an open page with mobile adaptation according to your own vision
- React
- Redux

***Backend technical points:***
Create an open API that will accept applications and save them in the database
- NodeJs (Nest preferred framework)
- Mysql/Postgress

- [Figma Design](https://www.figma.com/file/OmpRyHggnkIZ7Qr1c5o5gg/Untitled?type=design&node-id=7965-2&mode=design&t=sK1qga9e8bjQqN6B-0)
Notes: After user login header of the website would not have login|register button
anymore

Upload the application to any server,
Post a link to the downloaded application and GitHub
Leave these links in the "Video presentation from the developer" form sent with this
assignment.

Show what you can do, your approach to understanding the problem, think about what
bottlenecks there might be, look at the result as a user, and not as a programmer.

---

# Feedback

More than a week I spent on this certainly was too much. In my defense, there was a major prisma update since the last time I used it, and I didn't have electricity for almost 3 consecutive days. 

Other than that, the task itself certainly was useful as a practice, especially for implementing auth, and creating a kind of 'fullstack' project with db, server and client, as well as cloud storage i used for images. Making all of that work together was the biggest part of my work. 
I was pleasantly surprised to see figma designs instead of just descriptions. That's another positive about this task.

But it also has negatives. 
Specifically, the task description itself, which is pretty vague. I though by 'open' you mean publically accessible, so I hosted both server and client on cloud platforms. The backend should 'accept applications' but figma design doesn't contain any kind of interface for 'making' and 'application'. 
I decided that the word 'application' must be connected to those 'deals' from the ui, so I created a backend endpoint for creating a new 'building' to store in the db. Hopefully, that is what you meant by this. 
Also, in figma design, the root page is composed of two parts - one shown always ('get started'), one when logged in('open deals'). But it's not clear if the first part should stay or disappear when the user logs in. I decided to let it stay there, with the user having to scroll down to see 'open deals' part. 
Also, it was not clear what deadline I have for this task. 
I understand that guessing what the client wants is a part of dev's job, but still, the task description could be more precise.

As of 'thinking about bottlenecks', I have a few thoughts about what can be improved in my code. 
-My code doesn't have pagination when getting 'deals' to the ui, so if the user has a lot of them, it could slow the browser. Though, right now the 'deals' aren't even connected to users in the db, since it's not clear if they even should. 
- The way I write .tsx components could be improved, making more smaller components to make them more modular. If right now, the entire header is one component, in future each button on it might be it's own.
- Implementing signup/login with oauth proviers like google, github etc. would be an improvement, so the user would have choice when creating an account. 
- I didn't do unit tests, since I already spent more than a week on this. I should've. 

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
  "imageURL": " image.jpg" //object key for cloudflare r2 bucket
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