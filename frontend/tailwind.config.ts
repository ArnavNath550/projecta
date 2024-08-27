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
    },
  },
  plugins: [],
};
export default config;
