# 📦 Asset Lending Backend

A backend system for managing asset lending within an organization or campus.  
The system supports authentication, role-based authorization, asset management, and borrow/return workflows with enforced business rules.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control (admin, user)

### 🧱 Asset Management
- Admin-only asset creation
- Asset listing for authenticated users
- Asset availability tracking

### 🔄 Asset Lending Logic
- Assets can be borrowed only if available
- Prevents double borrowing
- Tracks active loans
- Only the borrower can return an asset
- Automatically updates availability on borrow and return

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

---

## 📁 Project Structure
asset-lending-backend/
├── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ │ └── db.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Asset.js
│ │ └── Loan.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ ├── asset.controller.js
│ │ └── loan.controller.js
│ ├── routes/
│ │ ├── auth.routes.js
│ │ ├── asset.routes.js
│ │ └── loan.routes.js
│ ├── middleware/
│ │ ├── auth.middleware.js
│ │ ├── role.middleware.js
│ │ └── error.middleware.js
│ └── utils/
│ └── jwt.js
├── .env.example
├── package.json
└── README.md


---

## 🔑 Environment Variables

Create a `.env` file in the root directory.
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


---

## ▶️ Getting Started

### Install dependencies
npm install

### Start the server
npm run dev

Server runs on:
http://localhost:3000

---

## 🧪 API Endpoints

### 🔐 Authentication

#### Register
POST /auth/register

Request body:
{
"name": "User",
"email": "user@test.com
",
"password": "password"
}

Returns a JWT token.

---

### 📦 Assets

#### Create Asset (Admin only)
POST /assets

Headers: Authorization: Bearer <ADMIN_TOKEN>

Request body:
{
"name": "MacBook Pro",
"category": "Laptop",
"assetCode": "MBP-001"
}

#### Get Assets (Authenticated users)
Headers:
Authorization: Bearer <TOKEN>

yaml
Copy code

---

### 🔄 Loans

#### Borrow Asset
POST /loans/borrow

Headers:
Authorization: Bearer <TOKEN>

Request body:
{
"assetId": "<asset_id>"
}

#### Return Asset
POST /loans/return

Headers:
Authorization: Bearer <TOKEN>

Request body:
{
"assetId": "<asset_id>"
}

---

## 🧠 Business Rules

- An asset can have only one active loan at a time
- Assets cannot be borrowed if unavailable
- Only the borrower can return an asset
- Asset availability is updated atomically

---

## 📌 Future Improvements

- Loan history endpoint
- Pagination for asset listing
- Request validation layer
- API documentation
- Cloud deployment

---

## ✅ Project Purpose

This project demonstrates backend system design, authentication, authorization, and real-world business logic enforcement suitable for internship evaluation.

## 🌍 Live Deployment

Backend deployed on Render:

https://asset-lending-backend.onrender.com