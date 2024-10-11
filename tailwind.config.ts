import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        colorSwamp: "var(--color-swamp)",
        colorDogerBlue: "var(--color-doger-blue)",
      },
      spacing: {
        'large-input': '54rem',
      }
    },
  },
  darkMode: "class",
 plugins: [nextui()],
};
export default config;
