# 🚀 Elite Stationery - Backend

Elite Stationery is an e-commerce platform that enables users to browse, order, and purchase stationery items securely using the **SSLCommerz** payment gateway. This repository contains the backend of the application, built using **Node.js, Express.js, TypeScript, and MongoDB (Mongoose)**.

## 📌 Features

- **User Authentication**: Register, login, and manage user roles (admin/user).
- **Product Management**: Add, update, delete, and retrieve product details.
- **Order Management**: Place, update, delete, and track orders.
- **Secure Payments**: Integrated **SSLCommerz** for seamless transactions.
- **Admin Controls**: Admin can manage users, orders, and products.

## 🛠️ Technologies Used

- **Node.js** - Server-side runtime
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database & ODM
- **TypeScript** - Type safety
- **JWT Authentication** - Secure user authentication
- **SSLCommerz** - Payment gateway

---

## 🔧 Installation and Setup

### 1️⃣ Clone the Repository
```sh
git clone <repository-url>
cd elite-stationery-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
SSL_STORE_ID=<your_sslcommerz_store_id>
SSL_STORE_PASSWORD=<your_sslcommerz_store_password>
```

### 4️⃣ Start the Server
```sh
npm run dev
```

The API will be available at `http://localhost:5000`

---

## 📁 API Routes

### 🔹 **Authentication Routes** (`/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `GET /get-single-user/:email` - Get user details
- `PUT /update-profile-data` - Update profile (Admin/User)
- `POST /admin/block-user` - Block a user (Admin)
- `POST /admin/make-active-user` - Reactivate user (Admin)
- `GET /admin/get-all-user` - Get all users (Admin)
- `POST /admin/change-user-role` - Change user role (Admin)

### 🔹 **Product Management** (`/product`)
- `POST /add-product` - Add a new product (Admin)
- `GET /` - Get all products
- `GET /:productId` - Get single product details
- `PUT /delete-product` - Delete a product (Admin/User)
- `PUT /update-product` - Update a product (Admin/User)

### 🔹 **Order & Payment** (`/order` & `/payment`)
- `POST /success/:tranId` - Payment success
- `POST /failed/:tranId` - Payment failed
- `POST /get-admin-order-data` - Admin retrieves all orders
- `POST /get-user-order-data` - User retrieves their orders
- `PUT /change-order-status` - Update order status (Admin)
- `PUT /delete-order` - Delete an order (Admin/User)

---

## 🤝 Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome!

---

## ⚖️ License
This project is licensed under the MIT License.

---

## 📩 Contact
For any inquiries, feel free to reach out:
📧 Email: [mdshohansajjad@gmail.com]
