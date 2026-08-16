import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative asset URLs make the build work both at a GitHub Pages
  // project subpath and at a custom/root domain without editing this file.
  base: "./",
  plugins: [react(), tailwindcss()],
});
