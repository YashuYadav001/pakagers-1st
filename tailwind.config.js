import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c2748",       // deep navy — headers, primary text on light
        ink2: "#132f57",      // secondary navy for gradients/panels
        paper: "#f6f7fb",     // off-white background
        paper2: "#eef1f7",    // slightly deeper panel background
        ember: "#e8622c",     // warm orange accent — CTAs
        ember2: "#c94f1f",    // darker ember for hover
        gold: "#c99e46",      // trust / rating accent
        slate: {
          ...colors.slate,
          DEFAULT: "#4b5a72", // muted body text
        },
        line: "#dde2ec",      // hairline borders
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(12,39,72,0.06), 0 8px 24px -12px rgba(12,39,72,0.18)",
      },
    },
  },
  plugins: [],
};
