# 🍔 OrderJo – Real-Time Food Ordering Platform

OrderJo is a full-stack food delivery web app built with **Laravel** (API) and **React.js** (client).  
It features real-time order tracking using **Pusher**, restaurant and courier management, and a complete authentication system.

---

## 🚀 Features

### 🧾 Core
- Full **JWT Authentication** (Login, Register, Logout)
- Role-based access for **User**, **Restaurant**, and **Courier**
- Protected routes and auto-redirect by role
- Password recovery & remember-me functionality

### 🍽️ Restaurant
- Manage menu items with categories (Burger, Pizza, Shawarma, etc.)
- Upload cover and logo images
- Define working days and hours (JSON-based)
- Receive and update orders in real time

### 🚗 Courier
- Assigned orders appear live
- Live status updates (e.g. *picked_up*, *delivering*, *delivered*)
- Map-based route preview (from → to)

### 📦 Orders
- Full order lifecycle:
pending → accepted → preparing → ready → waiting_for_pickup → courier_assigned → picked_up → delivering → delivered
canceled_user / canceled_restaurant

- Real-time updates powered by **Pusher**
- Automatic status toasts and visual feedback

### ⚡ Real-Time Notifications
- **Pusher** integration for instant status updates between:
- User ↔ Restaurant ↔ Courier
- Toast notifications for order events

### 🎨 Frontend (React + Tailwind)
- Responsive modern UI
- Category cards with images and dynamic routing
- Menu filtering by type
- Animated banners and improved loading states

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- Zustand (state management)
- TailwindCSS + Lucide Icons
- Formik + Yup (forms & validation)
- Sonner (toast notifications)

**Backend**
- Laravel 11
- Laravel  JWTAuth
- Pusher (real-time events)
- MySQL

---

## ⚙️ Setup

### Backend
```bash
cd server
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend
```
cd client
npm install
npm run dev
```

###.env (Laravel)
```
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=
FRONTEND_URL=
```

### .env (React)
```
VITE_API_URL=http://127.0.0.1:8000/api
VITE_PUSHER_KEY=your_pusher_key
```


##💬 Credits

Developed with ❤️ by Omar
Modern, fast, and real-time food delivery experience for users, restaurants, and couriers.

“OrderJo — bringing your food to life in real time 🍕🚴”
