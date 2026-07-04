import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2A5E",
          deep: "#081D42",
          light: "#1E4D8C",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8C766",
        },
      },
      fontFamily: {
        head: ["var(--font-head)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
