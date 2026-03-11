import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/products": {
        target: "https://kjgte52mpef3z47rok5fkxiszu0mmlnj.lambda-url.us-east-1.on.aws",
        changeOrigin: true,
        secure: true
      },
      "/orders": {
        target: "https://csh5ml7howdgg4ogo5ewsjth3i0hmqys.lambda-url.us-east-1.on.aws",
        changeOrigin: true,
        secure: true
      }
    }
  }
})