export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern Teal/Emerald Brand
        primary: "#0D9488", // Teal 600
        primaryHover: "#0F766E", // Teal 700

        // Neutral Scales (Direct Access if needed, renamed to avoid conflict)
        themeDark: {
          bg: "#09090b", // Zinc 950 (Rich Black)
          surface: "#18181b", // Zinc 900
          border: "#27272a", // Zinc 800
          text: "#f4f4f5", // Zinc 100
          textMuted: "#a1a1aa", // Zinc 400
        },
        themeLight: {
          bg: "#ffffff", // Pure White
          surface: "#f4f4f5", // Zinc 100 (Sidebar/Cards)
          border: "#e4e4e7", // Zinc 200
          text: "#18181b", // Zinc 900
          textMuted: "#71717a", // Zinc 500
        },

        // Semantic Aliases (The Core System)
        // Using `hsl(var(--param))` syntax allows for opacity modifiers like bg-background/80
        background: "hsl(var(--color-bg) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
        textPrimary: "hsl(var(--color-text) / <alpha-value>)",
        textSecondary: "hsl(var(--color-text-muted) / <alpha-value>)",

        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'], // Adjusted font stack
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0, 0, 0, 0.03)",
        medium: "0 4px 20px rgba(0, 0, 0, 0.06)",
        glow: "0 0 20px rgba(13, 148, 136, 0.3)", // Teal glow
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
};
