import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'background': '#121212',
      'surface': '#202020',
      'on-surface': '#9B9B9B',
      'on-surface-darker': '#1d1d1d'
    },
  },
  plugins: [],
};
export default config;
