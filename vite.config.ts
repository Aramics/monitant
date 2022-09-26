import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/monitant/",
	plugins: [react(), tsconfigPaths()],
	build: {
		sourcemap: true
	},
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: "./src/__tests__/setupTests.ts",
		coverage: {
			reporter: ["html", "lcov"]
		}
	}
});
