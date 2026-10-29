import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env variables to avoid hardcoded API URL (backend)
  // 'mode' is defined as the development or production build
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      proxy: {
        '/api/': {
          target: env.VITE_API_TARGET,
          changeOrigin: true,
          secure: false,
        }
      },
      // Optional: same proxy for `vite preview` (local test of the production build)
      preview: {
        proxy: {
          '/api/': {
            target: env.VITE_API_TARGET,
            changeOrigin: true,
          },
        },
      },      
    },
    plugins: [react()],
  };

});
