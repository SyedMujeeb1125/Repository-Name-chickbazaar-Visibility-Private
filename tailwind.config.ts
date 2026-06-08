import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A2342",
        orange: "#FF6B00",
        ink: "#102033"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(10, 35, 66, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
