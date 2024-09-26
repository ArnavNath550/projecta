import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // colors: {
    //   'background': '#0C0516',
    //   'brand-color': '#7368F5',
    //   'brand-lighter-color': '#9974da',
    //   'brand-darker-color': '#574ebe',
    //   'surface-border': '#373546',
    //   'surface': '#1b1525',
    //   'surface-lighter': '#241c32',
    //   'surface-darker': '#1d1728',
    //   'on-surface': '#9B9B9B',
    //   'on-surface-darker': '#16171b',
    //   'error': '#f74747'
    // },
    colors: {
      'background': '#030303',
      'brand-color': '#7368F5',
      'brand-lighter-color': '#9974da',
      'brand-darker-color': '#574ebe',
      'surface-border': '#383b42',
      'surface': '#2a2c33',
      'surface-lighter': '#292C33',
      'on-surface': '#9B9B9B',
      'on-surface-darker': '#16171b',
      'error': '#f74747',
      'transparent': 'transparent',
    },
    boxShadow: {
      primary: "rgb(80 63 205 / 50%) 0px 1px 40px",
    },
    transitionDelay: {
      0: "0ms",
    },
    keyframes: {
      "fade-in": {
        from: { opacity: "0", transform: "translateY(-10px)" },
        to: { opacity: "1", transform: "none" },
      },
      'fade-up': {
          '0%': { opacity: 0.5, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      "image-rotate": {
        "0%": { transform: "rotateX(25deg)" },
        "25%": { transform: "rotateX(25deg) scale(0.9)" },
        "60%": { transform: "none" },
        "100%": { transform: "none" },
      },
      "image-glow": {
        "0%": {
          opacity: "0",
          "animation-timing-function": "cubic-bezier(0.74,0.25,0.76,1)",
        },
        "10%": {
          opacity: "1",
          "animation-timing-function": "cubic-bezier(0.12,0.01,0.08,0.99)",
        },
        "100%": {
          opacity: "0.2",
        },
      },
      "sketch-lines": {
        "0%": { "stroke-dashoffset": "1" },
        "50%": { "stroke-dashoffset": "0" },
        "99%": { "stroke-dashoffset": "0" },
        "100%": { visibility: "hidden" },
      },
      "glow-line-horizontal": {
        "0%": { opacity: "0", transform: "translateX(0)" },
        "5%": { opacity: "1", transform: "translateX(0)" },
        "90%": { opacity: "1" },
        "100%": { opacity: "0", transform: "translateX(45rem)" },
      },
      "glow-line-vertical": {
        "0%": { opacity: "0", transform: "translateY(0)" },
        "5%": { opacity: "1", transform: "translateY(0)" },
        "90%": { opacity: "1" },
        "100%": { opacity: "0", transform: "translateY(45rem)" },
      },
      zap: {
        "0%, 9%, 11%, 100%": {
          fill: "transparent",
        },
        "10%": {
          fill: "white",
        },
      },
      bounce: {
        "50%": {
          transform: "scale(0.98)",
        },
      },
    },
    animation: {
      "fade-in": "fade-in 250ms var(--animation-delay, 0ms) ease forwards",
      "image-rotate": "image-rotate 1400ms ease forwards",
      "image-glow": "image-glow 4100ms 600ms ease-out forwards",
      "sketch-lines": "sketch-lines 1200ms ease-out forwards",
      "glow-line-horizontal":
        "glow-line-horizontal var(--animation-duration) ease-in forwards",
      "glow-line-vertical":
        "glow-line-vertical var(--animation-duration) ease-in forwards",
      zap: "zap 2250ms calc(var(--index) * 20ms) linear infinite",
      bounce: "bounce 240ms ease 0s 1 running",
      'fade-up': 'fade-up 0.3s ease-out',
    },
    backgroundImage: {
      "primary-gradient":
        "linear-gradient(92.88deg, rgb(69, 94, 181) 9.16%, rgb(86, 67, 204) 43.89%, rgb(103, 63, 215) 64.72%)",
      "page-gradient":
        "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3), transparent)",
      "hero-gradient":
        "radial-gradient(ellipse 50% 80% at 20% 40%,rgba(93,52,221,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(120,119,198,0.15),transparent)",
      "hero-glow":
        "conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)",
      "glow-lines":
        "linear-gradient(var(--direction),#9d9bf2 0.43%,#7877c6 14.11%,rgba(120,119,198,0) 62.95%)",
      "radial-faded":
        "radial-gradient(circle at bottom center,var(--color),transparent 70%)",
      "glass-gradient":
        "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 100%)",
    },
  },
  plugins: [],
};
export default config;
