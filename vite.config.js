import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api-products": {
        target:
          "https://kjgte52mpef3z47rok5fkxiszu0mmlnj.lambda-url.us-east-1.on.aws",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-products/, ""),
      },
      "/api-orders": {
        target:
          "https://csh5ml7howdgg4ogo5ewsjth3i0hmqys.lambda-url.us-east-1.on.aws",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api-orders/, ""),
      },
    },
  },
});
