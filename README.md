# 🚗 Vehicle Rental System – Backend API

A complete backend solution for managing a **vehicle rental system**, including vehicle inventory, customers, bookings, authentication, and role-based authorization.

---

## 🔗 Live API URL
(Add your deployed URL here)  
`https://your-api-url.com`

---

## 🎯 Project Overview

This project provides a modular and secure backend API for a vehicle rental system with the following core features:

- **Vehicles** – Manage vehicle inventory with availability tracking  
- **Customers** – Create and manage customer accounts  
- **Bookings** – Rent vehicles, calculate costs, handle returns  
- **Authentication** – JWT-based authentication with role-based access control (Admin/Customer)

The backend is structured using a **clean modular architecture** with separated layers for routes, controllers, and services.

---

## 🛠️ Technology Stack

- Node.js + TypeScript  
- Express.js  
- PostgreSQL  
- bcrypt  
- jsonwebtoken (JWT)  
- pg / Prisma / Sequelize (use whichever DB ORM you choose)

---

## 📁 Project Structure

src/
├── config/
├── database/
├── modules/
│ ├── auth/
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ └── auth.route.ts
│ ├── users/
│ ├── vehicles/
│ └── bookings/
├── middlewares/
├── utils/
├── app.ts
└── server.ts


✔ Feature-based modules  
✔ Clean layering: **Routes → Controllers → Services → Database**  
✔ Reusable authentication & role-based middlewares  

---

## 🗃️ Database Schema

### **Users Table**
| Field | Notes |
|-------|--------|
| id | Auto-generated |
| name | Required |
| email | Required, unique, lowercase |
| password | Hashed using bcrypt |
| phone | Required |
| role | 'admin' or 'customer' |

### **Vehicles Table**
| Field | Notes |
|-------|--------|
| id | Auto-generated |
| vehicle_name | Required |
| type | car, bike, van, SUV |
| registration_number | Unique |
| daily_rent_price | Positive number |
| availability_status | available / booked |

### **Bookings Table**
| Field | Notes |
|-------|--------|
| id | Auto-generated |
| customer_id | FK → Users |
| vehicle_id | FK → Vehicles |
| rent_start_date | Required |
| rent_end_date | Must be after start date |
| total_price | Positive |
| status | active / cancelled / returned |

---

## 🔐 Authentication & Authorization

### **User Roles**
- **Admin** – Full access  
- **Customer** – Limited to own bookings & profile  

### **Auth Flow**
- Signup & Signin via `/api/v1/auth/...`
- Login returns a **JWT token**
- Protected routes require header:
- Middleware validates:
- Token validity  
- Role-based permissions  

---

## 🌐 API Endpoints

### **Authentication**
| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| POST | `/api/v1/auth/signup` | Public | Register new user |
| POST | `/api/v1/auth/signin` | Public | Login and get JWT token |

---

### **Vehicles**
| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| POST | `/api/v1/vehicles` | Admin | Add vehicle |
| GET | `/api/v1/vehicles` | Public | Get all vehicles |
| GET | `/api/v1/vehicles/:vehicleId` | Public | Get one vehicle |
| PUT | `/api/v1/vehicles/:vehicleId` | Admin | Update vehicle |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin | Delete vehicle |

---

### **Users**
| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| GET | `/api/v1/users` | Admin | View all users |
| PUT | `/api/v1/users/:userId` | Admin/Customer | Update profile or role |
| DELETE | `/api/v1/users/:userId` | Admin | Delete user |

---

### **Bookings**
| Method | Endpoint | Access | Description |
|--------|----------|---------|-------------|
| POST | `/api/v1/bookings` | Customer/Admin | Create booking |
| GET | `/api/v1/bookings` | Role-based | Admin: all, Customer: own |
| PUT | `/api/v1/bookings/:bookingId` | Role-based | Cancel or return |

---

## 🚀 Installation & Setup

### **1. Clone Repository**
```bash
git clone https://github.com/your-username/vehicle-rental-system.git
cd vehicle-rental-system
npm install
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/vehicle_rental
JWT_SECRET=your_secret_key
npx prisma migrate dev
