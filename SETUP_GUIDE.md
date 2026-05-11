# Development Instructions

## To run locally:

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend will run on: http://localhost:5000

### 2. Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:3000

The Vite proxy will automatically forward `/api` requests to the backend at `localhost:5000`.

## To deploy to production:

### Backend
- Deploy backend code to Railway
- Set `FRONTEND_URL` environment variable to your frontend URL

### Frontend
- Update `VITE_API_URL` in `.env.production` with your production backend URL
- Run: `npm run build`
- Deploy the `dist` folder

## Troubleshooting Connection Refused Error:
- ❌ Make sure backend is running (`npm run dev` in backend folder)
- ❌ Confirm MongoDB is accessible with the URI in `.env`
- ❌ Check that frontend is using relative API paths (`/api`)
- ✅ Both dev and production configurations are now properly configured
