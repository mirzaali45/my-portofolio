/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9", // sky-500
        secondary: "#6366f1", // indigo-500
        accent: "#f472b6", // pink-400
        dark: "#0f172a", // slate-900
        light: "#f8fafc", // slate-50
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-playfair)"],
      },
      screens: {
        xs: "480px",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 3s infinite",
        "pulse-slow": "pulse 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        floatParticle: {
          "0%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-30px) translateX(10px)" },
          "50%": { transform: "translateY(-10px) translateX(30px)" },
          "75%": { transform: "translateY(20px) translateX(10px)" },
          "100%": { transform: "translateY(0) translateX(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 15px rgba(14, 165, 233, 0.5)",
        "glow-lg": "0 0 30px rgba(14, 165, 233, 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionDuration: {
        "2000": "2000ms",
      },
      zIndex: {
        "60": "60",
        "70": "70",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--tw-prose-body)",
            a: {
              color: "var(--tw-prose-links)",
              "&:hover": {
                color: "var(--color-primary)",
              },
            },
          },
        },
        dark: {
          css: {
            color: "var(--tw-prose-invert-body)",
            a: {
              color: "var(--tw-prose-invert-links)",
              "&:hover": {
                color: "var(--color-primary)",
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};
