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
        primary: {
          950: "#2D221D",
          900: "#54423A",
          800: "#674F45",
          700: "#7E6050",
          600: "#97765F",
          500: "#A4866B",
          400: "#A4866B",
          300: "#C7B8A3",
          200: "#DFD7C9",
          100: "#EFECE5",
          50: "#F8F6F4"
        },
        accent: '#BE7B62'
      },
      fontFamily: {
        stardom: ['var(--font-stardom)']
      },
      screens: {
        xs: '376px'
      }
    },
  },
  plugins: [],
};
export default config;
