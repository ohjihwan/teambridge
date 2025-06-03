import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@scss': path.resolve(__dirname, 'assets/scss'),
			'@img': path.resolve(__dirname, 'assets/imgs/img'),
			'@ico': path.resolve(__dirname, './assets/imgs/ico'),
			'@temp': path.resolve(__dirname, './assets/imgs/temp'),
		}
	}
})
