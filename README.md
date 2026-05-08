# Multi-Branch Recruitment & Applicant Tracking System (ATS)

**BSCS Web Development Semester Project**  
A professional full-stack web application for managing recruitment processes across multiple office branches.

## 🚀 Live Demo
- Frontend: [Your Vercel URL - Update after deployment]
- Backend: [Your Render URL - Update after deployment]
- GitHub: [Your GitHub Repository URL]

## 👥 Developed By
**Hussain Nawaz**  
Roll Number: 23f-0845  
BSCS 6F - Web Development Project

See [TEAM_INFO.md](TEAM_INFO.md) for detailed contributions.

## 📋 Features

### For Candidates
- Browse available jobs by branch and department
- Register and create profile
- Upload resume and cover letter (via Cloudinary)
- Apply for jobs
- Track application status (Submitted, Under Review, Shortlisted, Interview Scheduled, Rejected, Selected)
- View interview schedules
- Receive email notifications

### For HR/Admin
- Post, edit, and delete job openings
- View all applications
- Shortlist/reject candidates
- Schedule interviews with custom messages
- Send automated emails to candidates
- Manage multiple branches
- View applicant resumes and profiles

## 🛠 Technology Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Axios** - API requests
- **Vite** - Build tool
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - File storage
- **Nodemailer** - Email service (Gmail SMTP)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account
- Gmail account with App Password

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`:**
```env
# MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ats_db?retryWrites=true&w=majority

# JWT Secret (change this!)
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Cloudinary (from cloudinary.com dashboard)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gmail SMTP (use App Password, not regular password)
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_16_char_app_password

# Server Config
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. **Seed the database (creates test users and branches):**
```bash
node seed.js
```

6. **Start the backend server:**
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file (optional, defaults to localhost:5000):**
```bash
cp .env.example .env
```

4. **Start the development server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🧪 Test Accounts

After running `node seed.js`, use these accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ats.com | admin123 |
| HR | hr@ats.com | hr123 |
| Candidate | candidate@example.com | candidate123 |

## 🌐 Deployment

### Deploy Backend to Render

1. Create account on [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add all variables from `.env`
5. Click "Create Web Service"
6. Copy the deployed URL (e.g., `https://your-app.onrender.com`)

### Deploy Frontend to Vercel

1. Create account on [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variable:** `VITE_API_URL=https://your-backend.onrender.com`
5. Click "Deploy"
6. Your frontend will be live at `https://your-app.vercel.app`

### MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free M0 cluster
3. Create database user (username/password)
4. Network Access → Add IP: `0.0.0.0/0` (allows all IPs)
5. Click "Connect" → "Connect your application"
6. Copy connection string and update `MONGO_URI` in your env variables

### Cloudinary Setup

1. Create free account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy: Cloud Name, API Key, API Secret
4. Add to environment variables

### Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate app password for "Mail"
4. Use this 16-character password in `GMAIL_PASS`

## 📁 Project Structure

```
web/
├── backend/
│   ├── config/           # Database & Cloudinary config
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── utils/            # Email & token utilities
│   ├── server.js         # Entry point
│   ├── seed.js           # Database seeder
│   └── .env              # Environment variables
│
├── frontend/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Auth context
│   │   ├── utils/        # API utility
│   │   ├── App.jsx       # Main app component
│   │   ├── App.css       # Global styles
│   │   └── main.jsx      # Entry point
│   ├── vite.config.js    # Vite configuration
│   └── .env              # Environment variables
│
└── README.md             # This file
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/upload-resume` - Upload resume
- `POST /api/auth/upload-cover-letter` - Upload cover letter

### Jobs
- `GET /api/jobs` - Get all jobs (public)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (HR only)
- `PUT /api/jobs/:id` - Update job (HR only)
- `DELETE /api/jobs/:id` - Delete job (HR only)

### Applications
- `POST /api/applications` - Apply for job (candidate)
- `GET /api/applications/my-applications` - Get user's applications
- `GET /api/applications` - Get all applications (HR only)
- `PUT /api/applications/:id/status` - Update application status (HR only)

### Interviews
- `POST /api/interviews` - Schedule interview (HR only)
- `GET /api/interviews` - Get interviews
- `PUT /api/interviews/:id` - Update interview (HR only)

### Branches
- `GET /api/branches` - Get all branches
- `POST /api/branches` - Create branch (HR only)

## 📧 Email Notifications

The system automatically sends emails for:
- Application received confirmation
- Application shortlisted
- Interview scheduled
- Application rejected
- Application selected

## 🤝 GitHub Setup

1. **Initialize Git:**
```bash
git init
git add .
git commit -m "Initial commit: Complete ATS system"
```

2. **Create GitHub repository:**
   - Go to github.com and create new repository
   - Don't initialize with README (we already have one)

3. **Push code:**
```bash
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

4. **Add team members as collaborators:**
   - Repository Settings → Collaborators → Add people

## 👥 Team Collaboration

- Create feature branches: `feature/login`, `feature/job-listing`
- Make meaningful commits: "Add JWT authentication" not "update"
- Open Pull Requests for code review
- Each member must commit their own work

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string is correct
- Ensure all environment variables are set
- Run `npm install` again

### Frontend shows "Network Error"
- Check backend is running on port 5000
- Verify VITE_API_URL in frontend .env
- Check CORS settings in backend

### File upload fails
- Verify Cloudinary credentials are correct
- Check file size limits
- Ensure file types match allowed formats

### Emails not sending
- Use Gmail App Password, not regular password
- Enable "Less secure app access" if using older Gmail
- Check GMAIL_USER and GMAIL_PASS are correct

## 📝 License

This project is for educational purposes (BSCS Web Development Project).

## 👨‍💻 Authors

[Your Group Names and Roll Numbers]

---

**Note:** Remember to never commit your `.env` files to GitHub! They are already in `.gitignore`.
