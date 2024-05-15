import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B06E6A",
        muted: "#9CA3AF",
        fatal: "#171614",
        destructive: "#c92a2a"
      },
      fontFamily: {
        "tt-ramillas": ['var(--font-tt-ramillas-trl-var)']
      },
      screens: {
        xs: '376px'
      }
    },
  },
  plugins: [],
};
export default config;
