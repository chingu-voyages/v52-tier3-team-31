/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "letter-spacing": "tight",
          },
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          black: "#030712",
          dark: "#111827",
          light: "#6B7280",
        },
        secondary: {
          dark: "#7C2D12",
          light: "#F97316",
        },
        highlight: {
          DEFAULT: "#FBBF24",
        },
        status: {
          new: "#06B6D4",
          "new-bg": "#67E8F9",
          scheduled: "#22C55E",
          "scheduled-bg": "#86EFAC",
          cancelled: "#EF4444",
          "cancelled-bg": "#FCA5A5",
          visited: "#6B7280",
          "visited-bg": "#D1D5DB",
        },

        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      backgroundImage: {
        bannerImg:
          "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
    },
  },
  plugins: [],
};
