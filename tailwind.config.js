export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F2A44",
        primaryHover: "#273554",
        secondary: "#0F766E",

        background: "#F4F6F9",
        surface: "#FFFFFF",
        border: "#E5E7EB",

        textPrimary: "#111827",
        textSecondary: "#6B7280",

        success: "#16A34A",
        danger: "#DC2626",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        md: "6px",
      },
    },
  },
  plugins: [],
};
