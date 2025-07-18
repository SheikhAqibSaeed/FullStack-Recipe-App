# 🍲 Recipe App

A full-stack recipe application with a Node.js/Express backend and a React Native (Expo) mobile frontend. Users can browse, search, and save their favorite recipes.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Mobile App](#mobile-app)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- Browse and search recipes
- View detailed recipe information
- Save and manage favorite recipes
- User authentication (Clerk)
- Responsive and modern UI

---

## Tech Stack

- **Backend:** Node.js, Express, Drizzle ORM, SQLite/PostgreSQL
- **Mobile:** React Native (Expo), TypeScript
- **Authentication:** Clerk
- **UI:** Expo, React Native Paper, Linear Gradient, Expo Image, WebView

---

## Project Structure

```
fs-recipe-app/
  backend/           # Node.js/Express backend
    src/
      config/        # DB, environment, cron config
      db/            # Migrations, schema
      server.js      # Main server entry
  mobile/            # React Native (Expo) app
    app/             # App screens and navigation
    assets/          # Images, fonts, styles
    components/      # Reusable UI components
    constants/       # App-wide constants
    services/        # API service logic
```

---

## Setup Instructions

### 1. Backend

#### Prerequisites
- Node.js (v16+)
- npm

#### Install & Run

```sh
cd backend
npm install
npm run dev
```

- The backend will start on `http://localhost:5000` by default.

#### Environment Variables

Create a `.env` file in `backend/` if needed (for DB, Clerk, etc).

---

### 2. Mobile App

#### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (from App Store/Google Play)

#### Install & Run

```sh
cd mobile
npm install
npx expo start
```

- Scan the QR code with Expo Go on your device.

#### API URL Configuration

Edit `mobile/constants/api.ts` and set `API_URL` to your computer’s local IP:
```js
export const API_URL = "http://YOUR_LOCAL_IP:5000/api"
```
Replace `YOUR_LOCAL_IP` with your actual IP address.

#### Clerk Setup

- Get your Clerk publishable key from the [Clerk dashboard](https://dashboard.clerk.com/last-active?path=api-keys).
- Set it in `mobile/app/_layout.tsx`:
  ```tsx
  <ClerkProvider publishableKey="pk_..." ...>
  ```

---

## API Endpoints

| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| GET    | `/api/recipes`             | List all recipes               |
| GET    | `/api/recipes/:id`         | Get recipe details             |
| GET    | `/api/favorites/:userId`   | Get user's favorite recipes    |
| POST   | `/api/favorites`           | Add a recipe to favorites      |
| DELETE | `/api/favorites/:userId/:recipeId` | Remove from favorites  |

---

## Environment Variables

**Backend:**
- `CLERK_SECRET_KEY` (if using Clerk server-side)
- `DATABASE_URL` (if using PostgreSQL)

**Mobile:**
- `CLERK_PUBLISHABLE_KEY` (in code or via env)

---

## Screenshots

_Add screenshots of your app here!_

---

## License

MIT

---

## Acknowledgements

- [Clerk](https://clerk.com/)
- [Expo](https://expo.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [TheMealDB](https://www.themealdb.com/) (if using their API) 



![7](https://github.com/user-attachments/assets/96068755-e503-4615-8262-7a6c88742095)
![6](https://github.com/user-attachments/assets/630091c0-c812-492c-8588-186e92737032)
![5](https://github.com/user-attachments/assets/381bba44-70cd-4caf-9c0e-86a4211a0d99)
![4](https://github.com/user-attachments/assets/74bcb0eb-c801-4a72-bb48-a9fd46fe07b1)
![3](https://github.com/user-attachments/assets/7187548e-4783-4fe7-a5d3-c9751c982f41)
![2](https://github.com/user-attachments/assets/7a3db449-531d-4565-97f6-fce157e58148)
![1](https://github.com/user-attachments/assets/0c2238d5-a4a6-4029-b840-ec48ecce2e6c)
