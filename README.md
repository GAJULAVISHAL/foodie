# The Digital Diner

A mini restaurant ordering system that allows customers to browse the menu, add items to a cart, and place pickup orders online. Built with a React frontend and an Express/TypeScript backend, using PostgreSQL as the single source of truth and Prisma as the ORM.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Architecture](#architecture)  
4. [Prerequisites](#prerequisites)  
5. [Installation & Setup](#installation--setup)  
   - [Environment Variables](#environment-variables)  
   - [Database Setup](#database-setup)  
   - [Backend](#backend)  
   - [Frontend](#frontend)  
6. [API Endpoints](#api-endpoints)  
7. [Database Choice Justification](#database-choice-justification)  
8. [Assumptions & Challenges](#assumptions--challenges)  
9. [Future Improvements](#future-improvements)  
10. [License](#license)  

---

## Features

- **Menu Display**: Browse items categorized (Appetizers, Mains, Desserts, Drinks).  
- **Shopping Cart**: Add, remove, and view items with dynamic total.  
- **Order Placement**: Submit pickup orders with customer name & phone.  
- **Order History**: View past orders by phone number.  
- **TypeScript** throughout for type safety.

---

## Tech Stack

- **Frontend**: React, TypeScript, Vite, React Router  
- **Backend**: Node.js, Express, TypeScript, Prisma  
- **Database**: PostgreSQL  
- **ORM**: Prisma  
- **Deployment**: Frontend on Netlify (or your choice), Backend on Render/Heroku  

---

## Architecture


- Frontend fetches menu and posts orders to the backend.
- Backend validates and persists data in PostgreSQL via Prisma.
- No MongoDB—PostgreSQL holds both menu and order data for simplicity and consistency.

---

## Prerequisites

- Node.js v16+ & npm/yarn  
- PostgreSQL v12+  
- `npx prisma` 
---

## Installation & Setup

### Environment Variables

Create a `.env` file in the **backend** directory:

```ini
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=4000
```

Create a `.env` file in the **frontend** directory:
```ini
VITE_API_BASE_URL="http://localhost:4000/api"
```
``` ini
cd backend
npx prisma migrate dev --name init

cd backend
npm install
npm run build
npm run start        # starts server on PORT (default: 4000)
npm run dev          # starts in watch mode

```
```ini
cd frontend
npm install
npm run dev          # starts Vite dev server (default: localhost:5173)
npm run build        # builds for production
npm run preview      # preview production build
```
