import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  
    base: '/dashboard-react-grid-layout/', // путь к подкаталогу
    plugins: [tailwindcss()],
})