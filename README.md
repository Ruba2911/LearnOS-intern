# 🚀 LearnOS - AI Powered Learning Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge\&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge\&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge\&logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge\&logo=vercel)

## 🌟 Project Overview

LearnOS is a futuristic AI-powered learning dashboard designed to help users track learning progress, monitor achievements, analyze study patterns, and manage educational goals through an elegant and interactive interface.

The platform combines a modern SaaS dashboard experience with real-time backend integration using Supabase Authentication and Database Services.

---

## ✨ Key Features

### 🔐 Authentication

* User Registration
* Secure Login
* Session Management
* Protected Routes
* Supabase Authentication

### 📚 Learning Dashboard

* Personalized Dashboard
* Real-Time Course Tracking
* Progress Monitoring
* Learning Statistics
* Activity Heatmap

### 📊 Analytics

* Course Completion Analysis
* Learning Progress Tracking
* Study Activity Insights
* Performance Metrics

### 🏆 Achievement System

* Achievement Tracking
* Learning Milestones
* Progress Recognition

### 📅 Calendar & Planning

* Learning Schedule View
* Study Management Interface

### 🎨 Modern UI/UX

* Futuristic Glassmorphism Design
* Responsive Layout
* Dark Theme
* Smooth Animations
* Interactive Components

---

# 🛠️ Tech Stack

## Frontend

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

## Backend

* Supabase Database
* Supabase Authentication
* PostgreSQL

## Deployment

* GitHub
* Vercel

---

# 🏗️ Project Architecture

```text
User
 │
 ▼
Next.js Frontend
 │
 ▼
Supabase Auth
 │
 ▼
Supabase Database
 │
 ├── Profiles
 ├── Courses
 ├── User Progress
 ├── Activity Logs
 └── Achievements
```

---

# 📂 Database Structure

### Profiles

Stores user information.

### Courses

Stores available learning courses.

### User Progress

Tracks user course progress.

### Activity Logs

Stores daily learning activity.

### Achievements

Stores unlocked achievements.

---

# 📱 Available Pages

| Route         | Description        |
| ------------- | ------------------ |
| /             | Dashboard          |
| /courses      | Course Management  |
| /analytics    | Learning Analytics |
| /calendar     | Calendar View      |
| /achievements | Achievement Center |
| /settings     | User Settings      |
| /auth/login   | Login Page         |
| /auth/signup  | Registration Page  |

---

# ⚡ Installation

### Clone Repository

```bash
git clone https://github.com/Ruba2911/LearnOS-intern.git
```

### Navigate to Project

```bash
cd LearnOS-intern
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create:

```env
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

# ▶️ Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🏗️ Production Build

```bash
npm run build
```

```bash
npm start
```

---

# ☁️ Deployment

This project is optimized for deployment on:

* Vercel
* Supabase

### Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

# 🎯 Learning Objectives

This project demonstrates:

* Full Stack Web Development
* Authentication Systems
* Database Integration
* Responsive UI Design
* State Management
* API Integration
* Modern SaaS Dashboard Development
* Production Deployment Workflow

---

# 👨‍💻 Author

**Ruba Devi**

Information Technology Student

Passionate about:

* Full Stack Development
* Artificial Intelligence
* Data Analytics
* UI/UX Design
* Modern Web Applications

---

# 📜 License

This project is developed for educational and internship purposes.

---

⭐ If you like this project, consider giving it a star on GitHub!
