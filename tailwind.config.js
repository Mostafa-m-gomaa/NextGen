/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "dark",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      gold: "var(--gold)",
      main: "var(--main)",
      subMain: "var(--sub-main)",
      betMain: "var(--bet-main)",
      mainText: "var(--main-text)",
      sayed : "var(--sayed)",
      mainBorders: "var(--main-borders)",
      dark: "var(--dark)",
      gray: "var(--gray)",
      lightGray: "var(--lightGray)",
      lightGold: "var(--lightGold)",
      blackGold: "var(--blackGold)",
      goldenGray: "var(--goldenGray)",
      red: "var(--red)",
      blue: "var(--blue)",
      white: "var(--white)",
      card : "var(--card)"
    },
  },
  plugins: [],
};
