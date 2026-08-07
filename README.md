# 🚀 ServiceHub

**ServiceHub** is a modern full-stack service marketplace that connects customers with trusted professionals. Users can discover services, compare providers, book appointments, and manage bookings through a clean, responsive interface.

Designed with scalability and real-world architecture in mind, ServiceHub demonstrates a production-style MERN application featuring authentication, role-based authorization, image uploads, notifications, and professional dashboards for customers, providers, and administrators.

---

# 🌐 Live Demo

### Frontend

**https://servicehub-rust.vercel.app**

### Backend API

**https://servicehub-backend-qf2n.onrender.com**

---

# ✨ Features

## 👤 Customer

* Browse available services
* Search and filter services
* View detailed service information
* Book appointments
* Manage bookings
* Receive notifications
* Customer can Reveiew & Ratings to Provider

## 🛠️ Provider

* Provider Dashboard
* Create services
* Update services
* Manage bookings
* View customer requests
* Notification receiving from customer
  

## 🛡️ Admin

* Admin Dashboard
* Manage users
* Manage services
* Monitor platform activity
* Data visual in form of charts

## 🔐 Authentication

* JWT Authentication
* Secure Login & Registration
* Protected Routes
* Role-Based Access Control

## 🌟 Additional Features

* Fully Responsive Design
* Modern Landing Page
* Image Uploads using Cloudinary
* Toast Notifications
* Professional UI/UX
* Mobile Friendly Navigation

---

# 🏗️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cloudinary
* Multer
* Helmet
* CORS
* Express Rate Limit

## Database

* MongoDB Atlas

---

# 📂 Project Structure

```
ServiceHub
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── utils
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/rafay2ali/ServiceHub.git
```

---

## Install Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Install Backend

```bash
cd backend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME

CLOUDINARY_API_KEY=YOUR_API_KEY

CLOUDINARY_API_SECRET=YOUR_API_SECRET
```

---

# 🚀 Deployment

| Frontend | Vercel   | https://servicehub-rust.vercel.app           |
| Backend  | Render   | https://servicehub-backend-qf2n.onrender.com |

---

# 📈 Future Improvements

* Online Payment Integration
* Live Chat System
* Email Verification
* Forgot Password
* Provider Verification
* Real-Time Notifications

---

# 👨‍💻 Author

**Abdur Rafeh**

GitHub:
https://github.com/rafay2ali

---

# ⭐ Support

If you found this project helpful, please consider giving it a **⭐ Star** on GitHub.

It motivates me to build more professional full-stack applications.

---

# 📄 License

This project is created for educational and portfolio purposes.

