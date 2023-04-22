/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teel: "#96d1bd",
        coral: "#e85d4f",
        yels: "#ecbb5f",
        purples: "#b48aff",
        indigo: "#264461",
        green500: "#10b981",
        pink500: "#ec4899",
        orange500: "#f97316",
        cpurple: "#8884d8",
        cpink: "#fca5a5",
      },
      fontFamily: {
        sans: [
          "Roboto",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        mono: [
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      boxShadow: {
        content: "0px 4px 7px rgba(0, 0, 0, 0.1);",
        table: "0px 4px 7px rgb(0 0 0 / 10%)",
      },
    },
  },
  plugins: [],
};
