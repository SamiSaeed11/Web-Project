# Setup Instructions for ATS System

## Quick Setup (5 Steps)

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env file):**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your credentials:
- MongoDB Atlas connection string
- JWT secret key
- Cloudinary credentials
- Gmail SMTP credentials

### Step 3: Seed Database

```bash
cd backend
node seed.js
```

This creates test accounts:
- Admin: admin@ats.com / admin123
- HR: hr@ats.com / hr123456
- Candidate: candidate@example.com / candidate123

### Step 4: Start Backend Server

```bash
cd backend
npm start
```

Server runs on: http://localhost:5000

### Step 5: Start Frontend Server

```bash
cd frontend
npm run dev
```

Frontend runs on: http://localhost:3000

---

## Access the Application

Open your browser: **http://localhost:3000**

---

## Default Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ats.com | admin123 |
| HR | hr@ats.com | hr123456 |
| Candidate | candidate@example.com | candidate123 |

---

## Features to Test

1. **Public Portal:** Browse jobs, filter by branch
2. **Candidate:** Register, upload resume, apply for jobs
3. **HR Dashboard:** Post jobs, manage applications, schedule interviews
4. **Email Notifications:** Automatic emails on status changes

---

## Troubleshooting

**MongoDB connection fails:**
- Check if IP 0.0.0.0/0 is whitelisted in MongoDB Atlas
- Verify connection string in .env

**Frontend shows 404:**
- Make sure both servers are running
- Clear browser cache (Ctrl + Shift + R)

**File upload fails:**
- Verify Cloudinary credentials in .env
- Check file size (max 10MB)

---

For detailed instructions, see README.md
