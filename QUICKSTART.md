# 🚀 Quick Start Guide

## For Those Who Have Only 1 Day!

Follow these steps in order to get your project running:

### Step 1: Setup MongoDB Atlas (10 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free)
3. Create a free cluster (M0)
4. Create database user:
   - Username: `atsuser`
   - Password: (choose strong password)
5. Network Access → Add IP: `0.0.0.0/0`
6. Click "Connect" → "Connect your application"
7. Copy the connection string

### Step 2: Setup Cloudinary (5 minutes)

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up (free)
3. Dashboard → Copy these 3 values:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Setup Gmail App Password (5 minutes)

1. Enable 2FA on your Gmail account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and generate password
4. Copy the 16-character password

### Step 4: Configure Backend (5 minutes)

```bash
cd backend
cp .env.example .env
```

Edit `.env` and paste your credentials:
```env
MONGO_URI=your_mongodb_connection_string_from_step1
JWT_SECRET=anyrandomstringyouwant123456789
CLOUDINARY_CLOUD_NAME=from_step2
CLOUDINARY_API_KEY=from_step2
CLOUDINARY_API_SECRET=from_step2
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=16_char_password_from_step3
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Step 5: Start Backend (2 minutes)

```bash
npm install
node seed.js
npm start
```

You should see: "Server running on port 5000" and "MongoDB Connected"

### Step 6: Start Frontend (2 minutes)

Open a NEW terminal:

```bash
cd frontend
npm install
npm run dev
```

You should see: "Local: http://localhost:3000"

### Step 7: Test the Application (5 minutes)

1. Open browser: `http://localhost:3000`
2. Click "Login"
3. Use test account:
   - Email: `candidate@example.com`
   - Password: `candidate123`
4. Browse jobs and try applying!

For HR features, login with:
   - Email: `hr@ats.com`
   - Password: `hr123`

### Step 8: Deploy (Optional - if time allows)

#### Backend to Render:
1. Push code to GitHub first
2. Go to [render.com](https://render.com) → New Web Service
3. Connect GitHub repo
4. Add all environment variables from `.env`
5. Deploy!

#### Frontend to Vercel:
1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect GitHub repo
3. Root Directory: `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`
5. Deploy!

---

## Test Accounts

| Role | Name | Email | Password |
|------|------|-------|----------|
| Admin | Sami | sami@ats.com | sami123456 |
| HR | Afifah | afifah@ats.com | afifah123456 |
| Candidate | Husain | husain@ats.com | husain123456 |

---

## Common Issues & Fixes

**"Cannot connect to MongoDB"**
- Check MONGO_URI is correct
- Ensure IP `0.0.0.0/0` is whitelisted in MongoDB Atlas

**"Email not sending"**
- Use Gmail App Password, NOT regular password
- Check GMAIL_USER and GMAIL_PASS are correct

**"Frontend can't connect to backend"**
- Make sure backend is running on port 5000
- Check no CORS errors in browser console

**"File upload fails"**
- Verify Cloudinary credentials are correct
- Check all 3 Cloudinary values are set in .env

---

## What to Submit for Your Project

1. ✅ GitHub repository link (with all code)
2. ✅ Deployment links (Frontend + Backend URLs)
3. ✅ This README.md file
4. ✅ Project report (create separately)
5. ✅ ER Diagram (can create using draw.io)
6. ✅ API Documentation (already in README)

---

## GitHub Submission

```bash
# In the project root directory
git add .
git commit -m "Complete ATS System with all features"
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

Add your team members as collaborators on GitHub!

---

## Need Help?

Check the full README.md for detailed instructions.

**Good luck with your project! 🎉**
