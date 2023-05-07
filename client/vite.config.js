import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': "https://karma-server.onrender.com",
      '/login': "https://karma-server.onrender.com",
      '/logout': "https://karma-server.onrender.com",
      '/userprofile': "https://karma-server.onrender.com",
      '/todos': "https://karma-server.onrender.com",
      '/count': "https://karma-server.onrender.com",
      '/deleteDueTodo': "https://karma-server.onrender.com",
      '/submitTask': "https://karma-server.onrender.com",
      '/imgUpload': "https://karma-server.onrender.com",
      '/imgRemove': "https://karma-server.onrender.com",
      '/sendEmail': "https://karma-server.onrender.com",
    }
  }
})
