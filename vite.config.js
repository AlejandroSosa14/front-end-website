import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "https://backend-api-production-743a.up.railway.app",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
