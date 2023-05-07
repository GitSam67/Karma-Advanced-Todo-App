import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': "http://localhost:8000",
      '/login': "http://localhost:8000",
      '/logout': "http://localhost:8000",
      '/userprofile': "http://localhost:8000",
      '/todos': "http://localhost:8000",
      '/count': "http://localhost:8000",
      '/deleteDueTodo': "http://localhost:8000",
      '/submitTask': "http://localhost:8000",
      '/imgUpload': "http://localhost:8000",
      '/imgRemove': "http://localhost:8000",
      '/sendEmail': "http://localhost:8000",
    }
  }
})
