# 🔑 Test Account Credentials

## Login Credentials for ATS System

### 👨‍💼 Admin Account
- **Name:** Sami
- **Email:** sami@ats.com
- **Password:** sami123456
- **Role:** Administrator
- **Access:** Full system access

### 👩‍💼 HR Account
- **Name:** Afifah
- **Email:** afifah@ats.com
- **Password:** afifah123456
- **Role:** HR Manager
- **Access:** Post jobs, manage applications, schedule interviews

### 👤 Candidate Account
- **Name:** Husain
- **Email:** husain@ats.com
- **Password:** husain123456
- **Role:** Job Candidate
- **Access:** Browse jobs, apply, upload resume, track applications

---

## 🎯 Quick Test Guide

### Test as HR (Afifah):
1. Login with: afifah@ats.com / afifah123456
2. Go to HR Dashboard
3. Click "+ Post New Job"
4. Create a job posting
5. View applications
6. Schedule interviews

### Test as Candidate (Husain):
1. Login with: husain@ats.com / husain123456
2. Browse available jobs
3. Click on a job → Apply
4. Upload resume (PDF)
5. Check "My Dashboard" to see application status

### Test as Admin (Sami):
1. Login with: sami@ats.com / sami123456
2. Access all features
3. Manage users, jobs, and system settings

---

## 📌 Important Notes

- All passwords are at least 6 characters (minimum requirement)
- These accounts are automatically created when you run `node seed.js`
- Credentials are visible on the login page for easy testing
- Database is already seeded with these accounts

---

## 🔄 To Reset/Recreate Accounts

If you need to reset the database:

```bash
cd backend
node seed.js
```

This will clear all existing data and create fresh test accounts with these credentials.

---

**For Evaluators:** Use any of these accounts to test the complete ATS system functionality.
