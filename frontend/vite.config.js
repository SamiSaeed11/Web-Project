import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://web-project-production-98c9.up.railway.app',
        changeOrigin: true,      
      },
    },
  },
});
import cors from "cors";

app.use(cors({
  origin: "https://your-frontend.vercel.app",
  credentials: true
}));
