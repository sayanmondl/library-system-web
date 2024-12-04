import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "400px",
        xs: "475px",
        xm: "888px",
        xll: "1380px"
      },
      colors: {
        primary: {
          "100": "#FFE8F0",
          DEFAULT: "#EE2B69",
        },
        secondary: "#FBE843",
        black: {
          "100": "#383838",
          "200": "#141413",
          "300": "#7D8087",
          "400": "#545454",
          DEFAULT: "#000000",
        },
        white: {
          "100": "#F7F7F7",
          "200": "#b8b8b8",
          "300": "#f5f5f5",
          "400": "#d8d8d8",
          DEFAULT: "#FFFFFF",
        },
        red: {
          "100": "#962d34",
          DEFAULT: "#C9414A",
        },
        blue: {
          "100": "#255499",
          DEFAULT: "#0000ff",
        },
      },
      fontFamily: {
        gloock: ["var(--font-default)"],
        old: ["var(--font-subtext)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
